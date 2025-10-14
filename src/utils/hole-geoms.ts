import { createRoundedRectPrism } from "./pad-geoms"

export function createCircleHoleDrill({
  Manifold,
  x,
  y,
  diameter,
  thickness,
  segments = 32,
}) {
  const drill = Manifold.cylinder(
    thickness * 1.2,
    diameter / 2,
    diameter / 2,
    segments,
    true,
  )
  return drill.translate([x, y, 0])
}

export function createPillHoleDrill({
  Manifold,
  x,
  y,
  width,
  height,
  thickness,
  zOffset = 0.001,
}) {
  const drillW = width + 2 * zOffset
  const drillH = height + 2 * zOffset
  const drillDepth = thickness * 1.2

  const pillOp = createRoundedRectPrism({
    Manifold,
    width: drillW,
    height: drillH,
    thickness: drillDepth,
    borderRadius: Math.min(drillW, drillH) / 2,
  })

  // Only translate if x,y are non-zero (for backward compatibility)
  if (x !== 0 || y !== 0) {
    return pillOp.translate([x, y, 0])
  }
  return pillOp
}

export function createPlatedHoleDrill({
  Manifold,
  x,
  y,
  outerDiameter,
  thickness,
  zOffset = 0.001,
  segments = 32,
}) {
  const boardHoleRadius = outerDiameter / 2 + zOffset
  const drill = Manifold.cylinder(
    thickness * 1.2,
    boardHoleRadius,
    boardHoleRadius,
    segments,
    true,
  )
  return drill.translate([x, y, 0])
}
