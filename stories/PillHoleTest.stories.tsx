import { CadViewer } from "../src/CadViewer"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Debug/Pill Hole Test",
  component: CadViewer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CadViewer>

export default meta
type Story = StoryObj<typeof meta>

// Test with the exact user example - rotated pill hole
export const UserExample: Story = {
  args: {
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "board_1",
        thickness: 1.6,
        num_layers: 2,
        center: { x: 0, y: 0 },
        width: 20,
        height: 20,
        material: "fr4",
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_1",
        hole_shape: "rotated_pill",
        hole_width: 5,
        hole_height: 2,
        x: 0,
        y: 0,
        ccw_rotation: 45, // 45 degrees rotation
      },
    ],
  },
}

// Test with a non-plated pill hole (pcb_hole)
export const NonPlatedPillHole: Story = {
  args: {
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "board_1",
        thickness: 1.6,
        num_layers: 2,
        center: { x: 0, y: 0 },
        width: 20,
        height: 20,
        material: "fr4",
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_1",
        hole_shape: "pill",
        hole_width: 5,
        hole_height: 2,
        x: 0,
        y: 0,
      },
    ],
  },
}

// Test with a circular hole for comparison
export const NonPlatedCircularHole: Story = {
  args: {
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "board_1",
        thickness: 1.6,
        num_layers: 2,
        center: { x: 0, y: 0 },
        width: 20,
        height: 20,
        material: "fr4",
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_1",
        hole_shape: "circle",
        hole_diameter: 2,
        x: 0,
        y: 0,
      },
    ],
  },
}

// Test with multiple holes
export const MultipleHoles: Story = {
  args: {
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "board_1",
        thickness: 1.6,
        num_layers: 2,
        center: { x: 0, y: 0 },
        width: 30,
        height: 30,
        material: "fr4",
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_1",
        hole_shape: "pill",
        hole_width: 5,
        hole_height: 2,
        x: -8,
        y: 0,
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_2",
        hole_shape: "pill",
        hole_width: 2,
        hole_height: 6,
        x: 0,
        y: 0,
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_3",
        hole_shape: "circle",
        hole_diameter: 3,
        x: 8,
        y: 0,
      },
    ],
  },
}

// Test with rotated_pill hole_shape
export const RotatedPillHoleShape: Story = {
  args: {
    circuitJson: [
      {
        type: "pcb_board",
        pcb_board_id: "board_1",
        thickness: 1.6,
        num_layers: 2,
        center: { x: 0, y: 0 },
        width: 20,
        height: 20,
        material: "fr4",
      },
      {
        type: "pcb_hole",
        pcb_hole_id: "hole_1",
        hole_shape: "rotated_pill",
        hole_width: 5,
        hole_height: 2,
        x: 0,
        y: 0,
        ccw_rotation: 45,
      },
    ],
  },
}
