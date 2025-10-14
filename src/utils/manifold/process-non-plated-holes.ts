import type { ManifoldToplevel } from "manifold-3d/manifold.d.ts"
import type { AnyCircuitElement, PcbHole } from "circuit-json"
import { su } from "@tscircuit/circuit-json-util"
import { createCircleHoleDrill, createPillHoleDrill } from "../hole-geoms"
import {
  SMOOTH_CIRCLE_SEGMENTS,
  MANIFOLD_Z_OFFSET,
} from "../../geoms/constants"

// Type guard for PcbHole with hole_diameter
function isCircleHole(hole: any): hole is {
  x: number
  y: number
  hole_diameter: number
  hole_shape?: string
  shape?: string
} {
  return (
    (hole.shape === "circle" ||
      hole.hole_shape === "circle" ||
      hole.hole_shape === "round") &&
    typeof hole.hole_diameter === "number"
  )
}

// Type guard for PcbHole with pill shape
function isPillHole(hole: any): hole is {
  x: number
  y: number
  hole_width: number
  hole_height: number
  hole_shape?: string
  shape?: string
} {
  return (
    (hole.shape === "pill" || hole.hole_shape === "pill") &&
    typeof hole.hole_width === "number" &&
    typeof hole.hole_height === "number"
  )
}

// Type guard for PcbHole with rotated pill shape
function isRotatedPillHole(hole: any): hole is {
  x: number
  y: number
  hole_width: number
  hole_height: number
  ccw_rotation: number
  hole_shape?: string
  shape?: string
} {
  return (
    (hole.shape === "rotated_pill" || hole.hole_shape === "rotated_pill") &&
    typeof hole.hole_width === "number" &&
    typeof hole.hole_height === "number" &&
    typeof hole.ccw_rotation === "number"
  )
}

export interface ProcessNonPlatedHolesResult {
  nonPlatedHoleBoardDrills: any[]
}

export function processNonPlatedHolesForManifold(
  Manifold: ManifoldToplevel["Manifold"],
  circuitJson: AnyCircuitElement[],
  pcbThickness: number,
  manifoldInstancesForCleanup: any[],
): ProcessNonPlatedHolesResult {
  const nonPlatedHoleBoardDrills: any[] = []
  const pcbHoles = su(circuitJson).pcb_hole.list()

  pcbHoles.forEach((hole: PcbHole) => {
    if (isCircleHole(hole)) {
      const translatedDrill = createCircleHoleDrill({
        Manifold,
        x: hole.x,
        y: hole.y,
        diameter: hole.hole_diameter,
        thickness: pcbThickness,
        segments: SMOOTH_CIRCLE_SEGMENTS,
      })
      manifoldInstancesForCleanup.push(translatedDrill)
      nonPlatedHoleBoardDrills.push(translatedDrill)
    } else if (isPillHole(hole)) {
      // Regular pill hole - no rotation, just translate to position
      const translatedDrill = createPillHoleDrill({
        Manifold,
        x: hole.x,
        y: hole.y,
        width: hole.hole_width,
        height: hole.hole_height,
        thickness: pcbThickness,
        zOffset: MANIFOLD_Z_OFFSET,
      })
      manifoldInstancesForCleanup.push(translatedDrill)
      nonPlatedHoleBoardDrills.push(translatedDrill)
    } else if (isRotatedPillHole(hole)) {
      // Rotated pill hole - create at origin, rotate, then translate
      let pillDrill = createPillHoleDrill({
        Manifold,
        x: 0,
        y: 0,
        width: hole.hole_width,
        height: hole.hole_height,
        thickness: pcbThickness,
        zOffset: MANIFOLD_Z_OFFSET,
      })
      manifoldInstancesForCleanup.push(pillDrill)

      // Apply rotation
      const rotatedDrill = pillDrill.rotate([0, 0, hole.ccw_rotation])
      manifoldInstancesForCleanup.push(rotatedDrill)

      // Then translate to final position
      const translatedDrill = rotatedDrill.translate([hole.x, hole.y, 0])
      manifoldInstancesForCleanup.push(translatedDrill)
      nonPlatedHoleBoardDrills.push(translatedDrill)
    }
  })
  return { nonPlatedHoleBoardDrills }
}
