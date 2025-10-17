import { useState } from "react"
import { useLayerVisibility } from "../contexts/LayerVisibilityContext"
import type React from "react"

const menuItemStyle: React.CSSProperties = {
  padding: "8px 18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#f5f6fa",
  fontWeight: 400,
  fontSize: 14,
  transition: "background 0.1s",
}

const checkmarkStyle: React.CSSProperties = {
  width: 20,
}

const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = "#2d313a"
}

const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = "transparent"
}

export const AppearanceMenu = () => {
  const { visibility, toggleLayer } = useLayerVisibility()
  const [showSubmenu, setShowSubmenu] = useState(false)

  return (
    <>
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          margin: "8px 0",
        }}
      />
      <div
        style={{
          padding: "8px 18px",
          fontSize: 14,
          color: "#f5f6fa",
          fontWeight: 400,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.1s",
          position: "relative",
        }}
        onMouseEnter={() => setShowSubmenu(true)}
        onMouseLeave={() => setShowSubmenu(false)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <span>Appearance</span>
        <span
          style={{
            fontSize: 10,
            transform: showSubmenu ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▶
        </span>

        {showSubmenu && (
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              minWidth: 200,
              background: "#23272f",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
              zIndex: 1000,
              marginTop: 8,
              marginBottom: 8,
            }}
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("boardBody")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.boardBody ? "✔" : ""}
              </span>
              Board Body
            </div>
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("topCopper")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.topCopper ? "✔" : ""}
              </span>
              Top Copper
            </div>
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("bottomCopper")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.bottomCopper ? "✔" : ""}
              </span>
              Bottom Copper
            </div>
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("topSilkscreen")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.topSilkscreen ? "✔" : ""}
              </span>
              Top Silkscreen
            </div>
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("bottomSilkscreen")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.bottomSilkscreen ? "✔" : ""}
              </span>
              Bottom Silkscreen
            </div>
            <div
              style={menuItemStyle}
              onClick={() => toggleLayer("smtModels")}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <span style={checkmarkStyle}>
                {visibility.smtModels ? "✔" : ""}
              </span>
              CAD Models
            </div>
          </div>
        )}
      </div>
    </>
  )
}
