
'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import VeraBubble from '@/components/vds/VeraBubble'

// ============================================================================
// TYPES
// ============================================================================

type ToolMode = 'select' | 'room' | 'wall' | 'door' | 'window' | 'furniture'

type ViewMode = 'floor' | 'decorate' | '3d'

interface RoomShape {
  id: string
  x: number
  y: number
  width: number
  height: number
  name: string
  color: string

  // Decoration
  wallColor: string
  floorMaterial: 'wood' | 'tile' | 'carpet'
  floorColor: string
}

interface WallElement {
  id: string
  type: 'wall' | 'door' | 'window'
  x: number
  y: number
  width: number
  height: number
}

interface FurnitureItem {
  id: string
  type: string
  icon: string
  name: string
  x: number
  y: number
  width: number
  height: number
  rotation: number

  // Decoration
  fabricColor: string
  woodColor: string
}

interface DustParticle {
  id: string
  left: number
  top: number
  size: number
  duration: number
  delay: number
  opacity: number
}

// ============================================================================
// CATALOG
// ============================================================================

const furnitureCatalog = [
  { type: 'sofa', icon: '🛋️', name: 'Sofa', w: 160, h: 70 },
  { type: 'armchair', icon: '🪑', name: 'Chair', w: 70, h: 70 },
  { type: 'bed-double', icon: '🛏️', name: 'Double Bed', w: 140, h: 170 },
  { type: 'bed-single', icon: '🛏️', name: 'Single Bed', w: 95, h: 170 },
  { type: 'dining-table', icon: '🍽️', name: 'Dining Table', w: 120, h: 180 },
  { type: 'desk', icon: '🖥️', name: 'Desk', w: 115, h: 60 },
  { type: 'coffee-table', icon: '☕', name: 'Coffee Table', w: 105, h: 60 },
  { type: 'wardrobe', icon: '🚪', name: 'Wardrobe', w: 140, h: 60 },
  { type: 'bathtub', icon: '🛁', name: 'Bathtub', w: 160, h: 80 },
  { type: 'toilet', icon: '🚽', name: 'Toilet', w: 50, h: 60 },
  { type: 'sink', icon: '🚰', name: 'Sink', w: 60, h: 50 },
  { type: 'stove', icon: '🍳', name: 'Stove', w: 70, h: 60 },
  { type: 'fridge', icon: '🧊', name: 'Fridge', w: 70, h: 70 },
  { type: 'washer', icon: '🧺', name: 'Washer', w: 60, h: 60 },
  { type: 'plant', icon: '🌿', name: 'Plant', w: 40, h: 40 },
  { type: 'tv', icon: '📺', name: 'TV Stand', w: 115, h: 40 },
]

const roomColors = [
  { name: 'Living Room', color: 'rgba(168, 181, 160, 0.3)' },
  { name: 'Bedroom', color: 'rgba(196, 164, 132, 0.3)' },
  { name: 'Kitchen', color: 'rgba(201, 169, 98, 0.3)' },
  { name: 'Bathroom', color: 'rgba(180, 200, 220, 0.3)' },
  { name: 'Office', color: 'rgba(200, 180, 160, 0.3)' },
  { name: 'Dining', color: 'rgba(220, 200, 180, 0.3)' },
]

const wallColorOptions = [
  { name: 'Warm White', value: 'var(--warm-white)' },
  { name: 'Sand', value: 'var(--sand)' },
  { name: 'Gold', value: 'var(--gold)' },
  { name: 'Noir', value: 'var(--noir)' },
]

const floorMaterialOptions: Array<{ name: string; value: 'wood' | 'tile' | 'carpet' }> = [
  { name: 'Wood', value: 'wood' },
  { name: 'Tile', value: 'tile' },
  { name: 'Carpet', value: 'carpet' },
]

const floorColorOptions = [
  { name: 'Warm White', value: 'var(--warm-white)' },
  { name: 'Cream', value: 'var(--cream)' },
  { name: 'Sand', value: 'var(--sand)' },
]

const fabricColorOptions = [
  { name: 'Warm White', value: 'var(--warm-white)' },
  { name: 'Sand', value: 'var(--sand)' },
  { name: 'Gold', value: 'var(--gold)' },
]

const woodColorOptions = [
  { name: 'Sand', value: 'var(--sand)' },
  { name: 'Gold', value: 'var(--gold)' },
  { name: 'Noir', value: 'var(--noir)' },
]

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

// ============================================================================
// GRID SETTINGS
// ============================================================================

const GRID_SIZE = 10 // pixels per grid unit
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function VDSFloorPlan() {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('floor')
  const [decorateRoomId, setDecorateRoomId] = useState<string | null>(null)
  const [decorateFurnitureId, setDecorateFurnitureId] = useState<string | null>(null)

  // Tool state
  const [currentTool, setCurrentTool] = useState<ToolMode>('select')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedRoomType, setSelectedRoomType] = useState(0)
  const [selectedFurniture, setSelectedFurniture] = useState<typeof furnitureCatalog[0] | null>(null)
  
  // Data state
  const [rooms, setRooms] = useState<RoomShape[]>([])
  const [walls, setWalls] = useState<WallElement[]>([])
  const [furniture, setFurniture] = useState<FurnitureItem[]>([])
  
  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
  const [drawCurrent, setDrawCurrent] = useState({ x: 0, y: 0 })
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null)

  // 3D atmosphere (client-only randomness to avoid hydration mismatch)
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([])

  const canvasRef = useRef<HTMLDivElement>(null)

  // Get mouse position relative to canvas
  const getMousePos = (e: React.MouseEvent, snap = true) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    const raw = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    if (!snap) return raw
    return {
      x: snapToGrid(raw.x),
      y: snapToGrid(raw.y),
    }
  }

  const findRoomAtPoint = (x: number, y: number) => {
    return rooms.find(r => x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height) || null
  }

  const selectedDecorRoom = decorateRoomId ? rooms.find(r => r.id === decorateRoomId) || null : null
  const selectedDecorFurniture = decorateFurnitureId ? furniture.find(f => f.id === decorateFurnitureId) || null : null

  const furnitureInRoom = (room: RoomShape) => {
    return furniture.filter(item => {
      const cx = item.x + item.width / 2
      const cy = item.y + item.height / 2
      return cx >= room.x && cx <= room.x + room.width && cy >= room.y && cy <= room.y + room.height
    })
  }

  useEffect(() => {
    if (viewMode !== '3d') return

    // Match the new 3D view's dust behavior, but generate on the client
    // to avoid SSR/CSR hydration mismatches.
    const count = 25
    const next: DustParticle[] = Array.from({ length: count }, (_, i) => {
      return {
        id: `dust_${i}`,
        left: 20 + Math.random() * 60,
        top: 0,
        size: 3,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 12,
        opacity: 0.85,
      }
    })

    setDustParticles(next)
  }, [viewMode])

  const switchView = (mode: ViewMode) => {
    setViewMode(mode)
    setIsDrawing(false)
    setIsDragging(false)

    if ((mode === 'decorate' || mode === '3d') && !decorateRoomId && rooms.length > 0) {
      setDecorateRoomId(rooms[0].id)
      setDecorateFurnitureId(null)
    }
  }

  // Mouse down on canvas
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e, true)
    
    if (currentTool === 'room' || currentTool === 'wall') {
      setIsDrawing(true)
      setDrawStart(pos)
      setDrawCurrent(pos)
    } else if (currentTool === 'door') {
      setWalls(prev => [...prev, {
        id: generateId(),
        type: 'door',
        x: pos.x - 20,
        y: pos.y - 5,
        width: 40,
        height: 10,
      }])
    } else if (currentTool === 'window') {
      setWalls(prev => [...prev, {
        id: generateId(),
        type: 'window',
        x: pos.x - 30,
        y: pos.y - 5,
        width: 60,
        height: 10,
      }])
    } else if (currentTool === 'furniture' && selectedFurniture) {
      // Only place furniture when clicking inside a room
      const room = findRoomAtPoint(pos.x, pos.y)
      if (!room) return

      setFurniture(prev => [...prev, {
        id: generateId(),
        type: selectedFurniture.type,
        icon: selectedFurniture.icon,
        name: selectedFurniture.name,
        x: pos.x - selectedFurniture.w / 2,
        y: pos.y - selectedFurniture.h / 2,
        width: selectedFurniture.w,
        height: selectedFurniture.h,
        rotation: 0,

        fabricColor: 'var(--sand)',
        woodColor: 'var(--noir)',
      }])
    } else if (currentTool === 'select') {
      setSelectedId(null)
    }
  }

  // Mouse move
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    const posSnapped = getMousePos(e, true)
    const posRaw = getMousePos(e, false)

    // Room hover highlight in furniture mode
    if (currentTool === 'furniture') {
      const hover = findRoomAtPoint(posRaw.x, posRaw.y)
      setHoveredRoomId(hover?.id || null)
    } else if (hoveredRoomId) {
      setHoveredRoomId(null)
    }
    
    if (isDrawing) {
      setDrawCurrent(posSnapped)
    }
    
    if (isDragging && selectedId) {
      const isFurniture = furniture.some(f => f.id === selectedId)
      const dragPos = isFurniture ? posRaw : posSnapped
      let newX = dragPos.x - dragOffset.x
      let newY = dragPos.y - dragOffset.y

      // Bonus: snap furniture to room edges when near (simple, non-destructive)
      if (isFurniture) {
        const SNAP = 10
        const item = furniture.find(f => f.id === selectedId)
        const room = findRoomAtPoint(posRaw.x, posRaw.y) || (hoveredRoomId ? rooms.find(r => r.id === hoveredRoomId) || null : null)
        if (item && room) {
          const leftEdge = room.x
          const rightEdge = room.x + room.width - item.width
          const topEdge = room.y
          const bottomEdge = room.y + room.height - item.height

          if (Math.abs(newX - leftEdge) <= SNAP) newX = leftEdge
          if (Math.abs(newX - rightEdge) <= SNAP) newX = rightEdge
          if (Math.abs(newY - topEdge) <= SNAP) newY = topEdge
          if (Math.abs(newY - bottomEdge) <= SNAP) newY = bottomEdge
        }
      }
      
      // Update the dragged item
      setFurniture(prev => prev.map(f => 
        f.id === selectedId ? { ...f, x: newX, y: newY } : f
      ))
      setRooms(prev => prev.map(r => 
        r.id === selectedId ? { ...r, x: newX, y: newY } : r
      ))
      setWalls(prev => prev.map(w => 
        w.id === selectedId ? { ...w, x: newX, y: newY } : w
      ))
    }
  }

  // Mouse up
  const handleCanvasMouseUp = () => {
    if (isDrawing) {
      const x = Math.min(drawStart.x, drawCurrent.x)
      const y = Math.min(drawStart.y, drawCurrent.y)
      const w = Math.abs(drawCurrent.x - drawStart.x)
      const h = Math.abs(drawCurrent.y - drawStart.y)
      
      if (currentTool === 'room' && w > 30 && h > 30) {
        const roomType = roomColors[selectedRoomType]
        setRooms(prev => [...prev, {
          id: generateId(),
          x, y,
          width: w,
          height: h,
          name: roomType.name,
          color: roomType.color,

          wallColor: 'var(--wall-color)',
          floorMaterial: 'wood',
          floorColor: 'var(--cream)',
        }])
      } else if (currentTool === 'wall' && (w > 10 || h > 10)) {
        const isHorizontal = w > h
        setWalls(prev => [...prev, {
          id: generateId(),
          type: 'wall',
          x, y,
          width: isHorizontal ? w : 8,
          height: isHorizontal ? 8 : h,
        }])
      }
    }
    
    setIsDrawing(false)
    setIsDragging(false)
  }

  // Click on element to select
  const handleElementClick = (e: React.MouseEvent, id: string, itemX: number, itemY: number) => {
    const isFurniture = furniture.some(f => f.id === id)

    // Allow dragging furniture in both Select and Furniture tools.
    // Keep rooms/walls/doors/windows draggable only in Select tool.
    const canDrag = currentTool === 'select' || (currentTool === 'furniture' && isFurniture)
    if (!canDrag) return

    // Only stop bubbling when we're actually interacting with the element.
    // This lets clicks pass through to the canvas in Furniture mode (so we can place inside rooms).
    e.stopPropagation()

    setSelectedId(id)
    const pos = getMousePos(e, !isFurniture)
    setDragOffset({ x: pos.x - itemX, y: pos.y - itemY })
    setIsDragging(true)
  }

  // Delete selected
  const deleteSelected = () => {
    if (selectedId) {
      setFurniture(prev => prev.filter(f => f.id !== selectedId))
      setRooms(prev => prev.filter(r => r.id !== selectedId))
      setWalls(prev => prev.filter(w => w.id !== selectedId))
      setSelectedId(null)
    }
  }

  // Rotate selected furniture
  const rotateSelected = () => {
    if (selectedId) {
      setFurniture(prev => prev.map(f => {
        if (f.id === selectedId) {
          const newRotation = (f.rotation + 90) % 360
          // Swap width and height on rotation
          return { 
            ...f, 
            rotation: newRotation,
            width: f.height,
            height: f.width,
          }
        }
        return f
      }))
    }
  }

  // Clear all
  const clearAll = () => {
    setRooms([])
    setWalls([])
    setFurniture([])
    setSelectedId(null)
  }

  // Calculate total area
  const totalArea = rooms.reduce((acc, room) => {
    return acc + (room.width / GRID_SIZE) * (room.height / GRID_SIZE)
  }, 0)

  return (
    <div className="vds-floor-plan">
      <style jsx>{`
        .vds-floor-plan {
          --cream: #f5f0e8;
          --warm-white: #faf8f5;
          --sand: #d4c8b8;
          --gold: #c9a962;
          --noir: #0a0a0a;
          --wall-color: #2d2d2d;
          
          /* VDS header is fixed. Desktop header height = 70px logo + 20px*2 padding = 110px */
          margin-top: 110px;
          display: grid;
          grid-template-columns: ${viewMode === 'floor' ? '70px 1fr 280px' : '240px 1fr 320px'};
          height: calc(100vh - 110px);
          min-height: calc(100vh - 110px);
          background: var(--cream);
          font-family: 'Outfit', sans-serif;
        }

        /* ========== TOOLBAR ========== */
        .toolbar, .left-panel {
          background: var(--noir);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 8px;
          gap: 6px;
          height: calc(100vh - 110px);
        }

        .left-panel {
          align-items: stretch;
          padding: 20px 14px;
          gap: 14px;
        }

        .left-panel-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .left-panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: var(--gold);
          line-height: 1;
        }

        .left-panel-subtitle {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .room-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: auto;
          padding-right: 4px;
        }

        .room-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.2s;
        }

        .room-row:hover {
          border-color: rgba(255,255,255,0.15);
        }

        .room-row.active {
          border-color: var(--gold);
          background: rgba(201,169,98,0.12);
        }

        .room-row-name {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .room-row-chip {
          width: 16px;
          height: 16px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.1);
          flex: none;
        }

        .toolbar-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          color: var(--gold);
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          text-align: center;
        }

        .tool-btn {
          width: 60px;
          height: 56px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .tool-btn span {
          font-size: 1.5rem;
        }

        .tool-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .tool-btn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--noir);
        }

        .tool-divider {
          width: 32px;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 8px 0;
        }

        .tool-btn.danger:hover {
          border-color: #e57373;
          color: #e57373;
        }

        /* ========== CANVAS AREA ========== */
        .canvas-area {
          display: flex;
          flex-direction: column;
          padding: 20px;
          overflow: auto;
        }

        .canvas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .canvas-left {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
        }

        .view-toggle {
          display: inline-flex;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.6);
          overflow: hidden;
        }

        .view-btn {
          padding: 8px 12px;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: transparent;
          border: 0;
          cursor: pointer;
          color: rgba(0,0,0,0.65);
        }

        .view-btn.active {
          background: var(--noir);
          color: var(--warm-white);
        }

        .canvas-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--noir);
        }

        .canvas-stats {
          display: flex;
          gap: 20px;
          font-size: 0.7rem;
          color: rgba(0,0,0,0.5);
        }

        .canvas-stats span {
          color: var(--gold);
          font-weight: 500;
        }

        .canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: auto;
        }

        .decorate-stage {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 520px;
        }

        .decorate-preview {
          width: min(720px, 100%);
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
          padding: 18px;
        }

        .preview-room {
          position: absolute;
          inset: 18px;
          border-radius: 14px;
          border: 10px solid var(--wall-color);
          background: var(--cream);
          box-sizing: border-box;
        }

        .preview-room-inner {
          position: absolute;
          inset: 10px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--cream);
        }

        .floor-wood {
          background-image:
            repeating-linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.02) 8px, rgba(0,0,0,0.02) 16px);
        }

        .floor-tile {
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        .floor-carpet {
          background-image:
            radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px);
          background-size: 10px 10px;
        }

        .preview-furniture {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 2px solid rgba(0,0,0,0.1);
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          transform-origin: center;
        }

        .preview-furniture.active {
          box-shadow: 0 0 0 3px rgba(201,169,98,0.25), 0 2px 10px rgba(0,0,0,0.12);
          border-color: var(--gold);
        }

        .preview-furniture span {
          font-size: 1.4rem;
          pointer-events: none;
        }

        /* ==================== IMMERSIVE 3D ROOM VIEW ==================== */

        /* ==================== IMMERSIVE 3D CONTAINER ==================== */
        .immersive-container {
          position: relative;
          width: min(920px, 100%);
          height: min(560px, 100%);
          background: #faf8f5;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }

        /* ==================== LIGHTING ==================== */
        .light-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .sunlight {
          background:
            radial-gradient(ellipse 70% 90% at 72% 25%, rgba(255, 248, 235, 0.85) 0%, transparent 55%),
            radial-gradient(ellipse 50% 70% at 78% 35%, rgba(255, 245, 220, 0.5) 0%, transparent 45%);
          animation: sunPulse 8s ease-in-out infinite;
        }

        .ambient-glow {
          background:
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(212, 200, 184, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 70% 35% at 15% 85%, rgba(168, 181, 160, 0.12) 0%, transparent 50%);
        }

        @keyframes sunPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.88; }
        }

        /* ==================== LIGHT BEAMS ==================== */
        .light-beams {
          position: absolute;
          top: 0;
          right: 8%;
          width: 42%;
          height: 100%;
          pointer-events: none;
          z-index: 8;
          overflow: hidden;
        }

        .beam {
          position: absolute;
          background: linear-gradient(180deg,
            rgba(255, 250, 240, 0.38) 0%,
            rgba(255, 248, 235, 0.18) 35%,
            rgba(255, 245, 225, 0.04) 70%,
            transparent 100%);
          transform-origin: top center;
        }

        .beam-1 {
          width: 110px;
          height: 108%;
          top: -4%;
          left: 18%;
          transform: rotate(-9deg) skewX(-5deg);
          animation: beamFloat 11s ease-in-out infinite;
        }

        .beam-2 {
          width: 75px;
          height: 104%;
          top: -3%;
          left: 42%;
          transform: rotate(-6deg) skewX(-3deg);
          opacity: 0.7;
          animation: beamFloat 14s ease-in-out infinite reverse;
        }

        .beam-3 {
          width: 95px;
          height: 106%;
          top: -5%;
          left: 62%;
          transform: rotate(-11deg) skewX(-4deg);
          opacity: 0.5;
          animation: beamFloat 16s ease-in-out infinite;
        }

        @keyframes beamFloat {
          0%, 100% { opacity: 0.85; transform: rotate(-9deg) skewX(-5deg) translateX(0); }
          50% { opacity: 1; transform: rotate(-7deg) skewX(-4deg) translateX(12px); }
        }

        /* ==================== DUST PARTICLES ==================== */
        .dust-container {
          position: absolute;
          top: 0;
          right: 3%;
          width: 55%;
          height: 100%;
          pointer-events: none;
          z-index: 9;
          overflow: hidden;
        }

        .dust-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 250, 240, 0.85);
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255, 250, 240, 0.4);
          animation: dustFloat linear infinite;
        }

        @keyframes dustFloat {
          0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
          8% { opacity: 0.9; transform: translateY(85vh) translateX(8px) scale(1); }
          92% { opacity: 0.65; }
          100% { transform: translateY(-8vh) translateX(-18px) scale(0.4); opacity: 0; }
        }

        /* ==================== ROOM SCENE ==================== */
        .room-scene {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* Back Wall */
        .wall-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 62%;
          background: linear-gradient(180deg, #faf8f5 0%, #f5f0e8 60%, #ebe5db 100%);
        }

        /* Floor */
        .floor-surface {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 38%;
          background: linear-gradient(180deg, #e8e0d4 0%, #d4c8b8 100%);
        }

        /* ==================== WINDOW ==================== */
        .window-frame {
          position: absolute;
          top: 9%;
          right: 9%;
          width: 26%;
          height: 46%;
          background: linear-gradient(180deg, #e0f0f5 0%, #c8e0e8 40%, #d8eaef 100%);
          border: 4px solid #d4c8b8;
          box-shadow:
            inset 0 0 50px rgba(255, 255, 255, 0.75),
            0 8px 32px rgba(0, 0, 0, 0.08);
          z-index: 2;
        }

        .window-glass {
          position: absolute;
          inset: 0;
        }

        .window-divider-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: #d4c8b8;
        }

        .window-divider-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background: #d4c8b8;
        }

        .window-sill {
          position: absolute;
          bottom: -14px;
          left: -8px;
          right: -8px;
          height: 14px;
          background: linear-gradient(180deg, #d4c8b8 0%, #c4b8a8 100%);
          border-radius: 0 0 3px 3px;
        }

        /* ==================== FURNITURE SCENE ==================== */
        .furniture-scene {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 55%;
          z-index: 5;
        }

        .furniture-piece {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .furniture-piece:hover {
          transform: scale(1.02);
        }

        /* Furniture Shadows */
        .furniture-shadow {
          position: absolute;
          background: radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%);
          border-radius: 50%;
        }

        /* ==================== CSS SOFA ==================== */
        .css-sofa {
          position: absolute;
          bottom: 12%;
          left: 8%;
          width: 320px;
          height: 140px;
        }

        .sofa-back {
          position: absolute;
          bottom: 38%;
          left: 0;
          width: 100%;
          height: 52%;
          background: linear-gradient(180deg, #e8e0d4 0%, #d8cfc0 50%, #c8bfb0 100%);
          border-radius: 16px 16px 0 0;
          box-shadow: inset 0 8px 24px rgba(255,255,255,0.45), 0 -4px 16px rgba(0,0,0,0.06);
        }

        .sofa-seat {
          position: absolute;
          bottom: 20%;
          left: 6%;
          width: 88%;
          height: 28%;
          background: linear-gradient(180deg, #f0e8dc 0%, #e0d8cc 100%);
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.09), inset 0 4px 12px rgba(255,255,255,0.5);
        }

        .sofa-cushion {
          position: absolute;
          bottom: 42%;
          width: 27%;
          height: 42%;
          background: linear-gradient(135deg, #ebe3d7 0%, #ddd5c9 100%);
          border-radius: 10px;
          box-shadow: inset 0 4px 12px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.05);
        }

        .c1 { left: 8%; }
        .c2 { left: 36.5%; }
        .c3 { left: 65%; }

        .sofa-arm-left, .sofa-arm-right {
          position: absolute;
          bottom: 20%;
          width: 11%;
          height: 55%;
          background: linear-gradient(180deg, #e0d8cc 0%, #d0c8bc 100%);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
        }

        .sofa-arm-left { left: 0; border-radius: 12px 5px 5px 12px; }
        .sofa-arm-right { right: 0; border-radius: 5px 12px 12px 5px; }

        .sofa-leg {
          position: absolute;
          bottom: 0;
          width: 6%;
          height: 20%;
          background: linear-gradient(180deg, #8b7355 0%, #6b5545 100%);
          border-radius: 2px;
        }

        .l1 { left: 10%; }
        .l2 { left: 35%; }
        .l3 { right: 35%; }
        .l4 { right: 10%; }

        .sofa-shadow {
          bottom: -6%;
          left: 5%;
          width: 90%;
          height: 18%;
        }

        /* ==================== CSS CHAIR ==================== */
        .css-chair {
          position: absolute;
          bottom: 10%;
          left: 38%;
          width: 100px;
          height: 110px;
        }

        .chair-back {
          position: absolute;
          bottom: 32%;
          left: 12%;
          width: 76%;
          height: 55%;
          background: linear-gradient(180deg, #d8cfc0 0%, #c8bfb0 100%);
          border-radius: 10px 10px 0 0;
          box-shadow: inset 0 5px 15px rgba(255,255,255,0.35);
        }

        .chair-seat {
          position: absolute;
          bottom: 22%;
          left: 8%;
          width: 84%;
          height: 20%;
          background: linear-gradient(180deg, #e8e0d4 0%, #d8d0c4 100%);
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .chair-arm-left, .chair-arm-right {
          position: absolute;
          bottom: 22%;
          width: 14%;
          height: 48%;
          background: linear-gradient(180deg, #d0c8bc 0%, #c0b8ac 100%);
          border-radius: 5px;
        }

        .chair-arm-left { left: 0; }
        .chair-arm-right { right: 0; }

        .chair-leg {
          position: absolute;
          bottom: 0;
          width: 10%;
          height: 22%;
          background: linear-gradient(180deg, #8b7355 0%, #6b5545 100%);
          border-radius: 2px;
        }

        .cl1 { left: 22%; }
        .cl2 { right: 22%; }

        .chair-shadow {
          bottom: -8%;
          left: 10%;
          width: 80%;
          height: 20%;
        }

        /* ==================== CSS COFFEE TABLE ==================== */
        .css-coffee-table {
          position: absolute;
          bottom: 8%;
          left: 22%;
          width: 180px;
          height: 60px;
        }

        .table-top {
          position: absolute;
          top: 25%;
          left: 0;
          width: 100%;
          height: 22%;
          background: linear-gradient(180deg, #a08060 0%, #8b7050 100%);
          border-radius: 25px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.18);
        }

        .table-leg {
          position: absolute;
          bottom: 0;
          width: 7%;
          height: 62%;
          background: linear-gradient(180deg, #8b7050 0%, #6b5040 100%);
          border-radius: 2px;
        }

        .tl1 { left: 18%; }
        .tl2 { right: 18%; }

        .table-shadow {
          bottom: -12%;
          left: 8%;
          width: 84%;
          height: 25%;
        }

        /* ==================== CSS DINING TABLE ==================== */
        .css-dining-table {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          height: 110px;
        }

        .dining-top {
          position: absolute;
          top: 22%;
          left: 0;
          width: 100%;
          height: 18%;
          background: linear-gradient(180deg, #a08060 0%, #8b7050 100%);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.18);
        }

        .dining-leg {
          position: absolute;
          bottom: 0;
          width: 4.5%;
          height: 60%;
          background: linear-gradient(180deg, #8b7050 0%, #6b5040 100%);
          border-radius: 2px;
        }

        .dl1 { left: 10%; }
        .dl2 { left: 35%; }
        .dl3 { right: 35%; }
        .dl4 { right: 10%; }

        .dining-shadow {
          bottom: -12%;
          left: 8%;
          width: 84%;
          height: 22%;
        }

        /* ==================== CSS FLOOR LAMP ==================== */
        .css-lamp {
          position: absolute;
          bottom: 10%;
          right: 12%;
          width: 55px;
          height: 160px;
        }

        .lamp-shade {
          position: absolute;
          top: 0;
          left: 8%;
          width: 84%;
          height: 28%;
          background: linear-gradient(180deg, #faf8f5 0%, #e8e0d4 100%);
          border-radius: 5px 5px 18px 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .lamp-pole {
          position: absolute;
          top: 26%;
          left: 42%;
          width: 16%;
          height: 55%;
          background: linear-gradient(180deg, #c4a484 0%, #a08060 100%);
        }

        .lamp-base {
          position: absolute;
          bottom: 0;
          left: 22%;
          width: 56%;
          height: 10%;
          background: linear-gradient(180deg, #a08060 0%, #806040 100%);
          border-radius: 4px;
        }

        .lamp-glow {
          position: absolute;
          top: -15%;
          left: -30%;
          width: 160%;
          height: 50%;
          background: radial-gradient(ellipse, rgba(255, 220, 150, 0.2) 0%, transparent 65%);
          pointer-events: none;
        }

        .lamp-shadow {
          bottom: -5%;
          left: 15%;
          width: 70%;
          height: 15%;
        }

        /* ==================== CSS PLANT ==================== */
        .css-plant {
          position: absolute;
          bottom: 8%;
          right: 25%;
          width: 70px;
          height: 130px;
        }

        .plant-leaves {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 62%;
        }

        .leaf {
          position: absolute;
          background: linear-gradient(135deg, #a8b5a0 0%, #889880 100%);
          border-radius: 50% 0 50% 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .lf1 { width: 45%; height: 55%; top: 8%; left: 28%; transform: rotate(-12deg); }
        .lf2 { width: 38%; height: 48%; top: 0; left: 52%; transform: rotate(22deg); background: linear-gradient(135deg, #b0bda8 0%, #90a088 100%); }
        .lf3 { width: 42%; height: 52%; top: 12%; left: 12%; transform: rotate(-28deg); }
        .lf4 { width: 35%; height: 42%; top: 18%; left: 58%; transform: rotate(32deg); background: linear-gradient(135deg, #a0ad98 0%, #808878 100%); }
        .lf5 { width: 32%; height: 38%; top: 25%; left: 38%; transform: rotate(5deg); }

        .plant-pot {
          position: absolute;
          bottom: 0;
          left: 18%;
          width: 64%;
          height: 38%;
          background: linear-gradient(180deg, #c4a484 0%, #9a7454 100%);
          border-radius: 5px 5px 14px 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
        }

        .plant-shadow {
          bottom: -6%;
          left: 12%;
          width: 76%;
          height: 18%;
        }

        /* ==================== CSS BED ==================== */
        .css-bed {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 280px;
          height: 180px;
        }

        .bed-headboard {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(180deg, #a08060 0%, #806040 100%);
          border-radius: 8px 8px 0 0;
        }

        .bed-frame {
          position: absolute;
          bottom: 8%;
          left: 0;
          width: 100%;
          height: 55%;
          background: linear-gradient(180deg, #e8e0d4 0%, #d8d0c4 100%);
          border-radius: 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .bed-mattress {
          position: absolute;
          bottom: 15%;
          left: 3%;
          width: 94%;
          height: 45%;
          background: linear-gradient(180deg, #f5f0e8 0%, #e8e0d8 100%);
          border-radius: 4px;
        }

        .bed-pillow {
          position: absolute;
          top: 38%;
          width: 28%;
          height: 18%;
          background: linear-gradient(180deg, #faf8f5 0%, #f0ebe5 100%);
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .p1 { left: 8%; }
        .p2 { right: 8%; }

        .bed-shadow {
          bottom: -5%;
          left: 3%;
          width: 94%;
          height: 15%;
        }

        /* ==================== CSS DESK ==================== */
        .css-desk {
          position: absolute;
          bottom: 10%;
          left: 55%;
          width: 160px;
          height: 90px;
        }

        .desk-top {
          position: absolute;
          top: 20%;
          left: 0;
          width: 100%;
          height: 18%;
          background: linear-gradient(180deg, #a08060 0%, #8b7050 100%);
          border-radius: 4px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        }

        .desk-leg {
          position: absolute;
          bottom: 0;
          width: 8%;
          height: 70%;
          background: linear-gradient(180deg, #8b7050 0%, #6b5040 100%);
          border-radius: 2px;
        }

        .dkl1 { left: 8%; }
        .dkl2 { right: 8%; }

        .desk-shadow {
          bottom: -10%;
          left: 5%;
          width: 90%;
          height: 22%;
        }

        /* ==================== CSS BOOKSHELF ==================== */
        .css-bookshelf {
          position: absolute;
          bottom: 10%;
          right: 5%;
          width: 120px;
          height: 180px;
        }

        .shelf-frame {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #a08060 0%, #8b7050 100%);
          border-radius: 4px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }

        .shelf {
          position: absolute;
          left: 5%;
          width: 90%;
          height: 4%;
          background: #6b5040;
        }

        .s1 { top: 28%; }
        .s2 { top: 55%; }
        .s3 { top: 82%; }

        .books {
          position: absolute;
          left: 10%;
          width: 80%;
          background: linear-gradient(90deg, #a8b5a0, #c4a484, #d4c8b8, #8b7355);
          border-radius: 2px;
        }

        .b1 { top: 8%; height: 18%; }
        .b2 { top: 35%; height: 18%; }

        .shelf-shadow {
          bottom: -5%;
          left: 8%;
          width: 84%;
          height: 12%;
        }

        /* ==================== CSS GENERIC ==================== */
        .css-generic {
          position: absolute;
          bottom: 10%;
          left: 45%;
          width: 80px;
          height: 80px;
        }

        .generic-body {
          width: 100%;
          height: 85%;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }

        .generic-shadow {
          bottom: -8%;
          left: 10%;
          width: 80%;
          height: 18%;
        }

        /* ==================== ROOM LABEL ==================== */
        .room-label {
          position: absolute;
          bottom: 28px;
          left: 28px;
          z-index: 20;
        }

        .label-category {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c4a484;
          margin-bottom: 6px;
        }

        .label-name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: #2d2d2d;
          line-height: 1.1;
        }

        /* ==================== SELECT ROOM PROMPT ==================== */
        .select-room-prompt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 20;
        }

        .select-room-prompt p {
          font-size: 1.1rem;
          color: rgba(45, 45, 45, 0.5);
          letter-spacing: 0.05em;
        }

        .canvas {
          position: relative;
          width: ${CANVAS_WIDTH}px;
          height: ${CANVAS_HEIGHT}px;
          background: 
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: ${GRID_SIZE}px ${GRID_SIZE}px;
          border: 2px solid var(--sand);
          cursor: ${currentTool === 'select' ? 'default' : 'crosshair'};
        }

        /* Room */
        .room {
          position: absolute;
          border: 2px solid rgba(45,45,45,0.3);
          cursor: ${currentTool === 'select' ? 'move' : 'default'};
          transition: border-color 0.2s;
        }

        .room.selected {
          border-color: var(--gold);
          border-width: 3px;
        }

        .room.hovered {
          outline: 2px solid rgba(201,169,98,0.7);
          outline-offset: 2px;
        }

        .room-label {
          position: absolute;
          top: 5px;
          left: 5px;
          background: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.6rem;
          font-weight: 500;
          color: var(--noir);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          pointer-events: none;
        }

        .room-size {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: rgba(255,255,255,0.9);
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.5rem;
          color: rgba(0,0,0,0.5);
          pointer-events: none;
        }

        /* Wall */
        .wall {
          position: absolute;
          background: var(--wall-color);
          cursor: ${currentTool === 'select' ? 'move' : 'default'};
        }

        .wall.selected {
          background: var(--gold);
        }

        /* Door */
        .door {
          position: absolute;
          background: linear-gradient(180deg, #a08060 0%, #806040 100%);
          border-radius: 2px;
          cursor: ${currentTool === 'select' ? 'move' : 'default'};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .door.selected {
          box-shadow: 0 0 0 2px var(--gold);
        }

        .door::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #c9a962;
          border-radius: 50%;
          top: 50%;
          right: 4px;
          transform: translateY(-50%);
        }

        /* Window */
        .window-el {
          position: absolute;
          background: linear-gradient(180deg, #d4e8ed 0%, #a8c8d8 100%);
          border: 2px solid var(--sand);
          cursor: ${currentTool === 'select' ? 'move' : 'default'};
        }

        .window-el.selected {
          border-color: var(--gold);
          border-width: 3px;
        }

        .window-el::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--sand);
          transform: translateY(-50%);
        }

        /* Furniture */
        .furniture-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 4px;
          cursor: ${currentTool === 'select' || currentTool === 'furniture' ? 'move' : 'default'};
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: box-shadow 0.2s;
        }

        .furniture-item.selected {
          border-color: var(--gold);
          border-width: 2px;
          box-shadow: 0 0 0 3px rgba(201,169,98,0.3);
        }

        .furniture-item span {
          font-size: 2rem;
          pointer-events: none;
        }

        /* Drawing preview */
        .drawing-preview {
          position: absolute;
          border: 2px dashed var(--gold);
          background: rgba(201,169,98,0.1);
          pointer-events: none;
        }

        /* ========== RIGHT PANEL ========== */
        .panel {
          background: var(--noir);
          color: var(--warm-white);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .panel-header {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--gold);
        }

        .panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }

        /* Room type selector */
        .room-types {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .room-type {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .room-type:hover {
          border-color: rgba(255,255,255,0.15);
        }

        .room-type.active {
          border-color: var(--gold);
          background: rgba(201,169,98,0.1);
        }

        .room-type-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .room-type-name {
          font-size: 0.8rem;
        }

        /* Furniture grid */
        .furniture-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .furniture-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 6px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .furniture-option:hover {
          border-color: var(--gold);
          background: rgba(201,169,98,0.1);
        }

        .furniture-option.active {
          border-color: var(--gold);
          background: rgba(201,169,98,0.15);
        }

        .furniture-option span {
          font-size: 1.35rem;
        }

        .furniture-option small {
          font-size: 0.7rem;
          opacity: 0.6;
          text-align: center;
        }

        /* Selected info */
        .selected-info {
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 12px;
        }

        .selected-label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 6px;
        }

        .selected-name {
          font-size: 0.85rem;
          margin-bottom: 10px;
        }

        .selected-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          flex: 1;
          padding: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .action-btn.danger:hover {
          border-color: #e57373;
          color: #e57373;
        }

        /* Instructions */
        .instructions {
          font-size: 0.8rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.4);
        }

        .instructions strong {
          color: var(--gold);
        }

        /* Mobile */
        @media (max-width: 900px) {
          .vds-floor-plan {
            grid-template-columns: 1fr;
            /* Mobile header height = 55px logo + 15px*2 padding = 85px */
            margin-top: 85px;
            height: calc(100vh - 85px);
            min-height: calc(100vh - 85px);
          }
          .toolbar, .panel, .left-panel {
            display: none;
          }
        }
      `}</style>

      {/* LEFT */}
      {viewMode === 'floor' ? (
        <div className="toolbar">
          <div className="toolbar-logo">FLOOR<br/>PLAN</div>

          <button
            className={`tool-btn ${currentTool === 'select' ? 'active' : ''}`}
            onClick={() => setCurrentTool('select')}
          >
            <span>↖</span>
            Select
          </button>

          <div className="tool-divider" />

          <button
            className={`tool-btn ${currentTool === 'room' ? 'active' : ''}`}
            onClick={() => setCurrentTool('room')}
          >
            <span>⬜</span>
            Room
          </button>

          <button
            className={`tool-btn ${currentTool === 'wall' ? 'active' : ''}`}
            onClick={() => setCurrentTool('wall')}
          >
            <span>▬</span>
            Wall
          </button>

          <button
            className={`tool-btn ${currentTool === 'door' ? 'active' : ''}`}
            onClick={() => setCurrentTool('door')}
          >
            <span>🚪</span>
            Door
          </button>

          <button
            className={`tool-btn ${currentTool === 'window' ? 'active' : ''}`}
            onClick={() => setCurrentTool('window')}
          >
            <span>▢</span>
            Window
          </button>

          <div className="tool-divider" />

          <button
            className={`tool-btn ${currentTool === 'furniture' ? 'active' : ''}`}
            onClick={() => setCurrentTool('furniture')}
          >
            <span>🛋️</span>
            Furnish
          </button>

          <div className="tool-divider" />

          <button
            className="tool-btn danger"
            onClick={clearAll}
          >
            <span>🗑️</span>
            Clear
          </button>
        </div>
      ) : (
        <div className="left-panel">
          <div className="left-panel-header">
            <div>
              <div className="left-panel-title">Rooms</div>
              <div className="left-panel-subtitle">Select a room</div>
            </div>
          </div>

          <div className="room-list">
            {rooms.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                Create rooms in FLOOR PLAN mode first.
              </div>
            ) : (
              rooms.map(r => (
                <div
                  key={r.id}
                  className={`room-row ${decorateRoomId === r.id ? 'active' : ''}`}
                  onClick={() => {
                    setDecorateRoomId(r.id)
                    setDecorateFurnitureId(null)
                  }}
                >
                  <div className="room-row-name">{r.name}</div>
                  <div className="room-row-chip" style={{ background: r.color }} />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CANVAS AREA */}
      <div className="canvas-area">
        <div className="canvas-header">
          <div className="canvas-left">
            <h1 className="canvas-title">
              {viewMode === 'floor' ? 'Floor Plan Designer' : viewMode === 'decorate' ? 'Decorate' : '3D View'}
            </h1>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'floor' ? 'active' : ''}`}
                onClick={() => switchView('floor')}
              >
                Floor Plan
              </button>
              <button
                className={`view-btn ${viewMode === 'decorate' ? 'active' : ''}`}
                onClick={() => switchView('decorate')}
              >
                Decorate
              </button>
              <button
                className={`view-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => switchView('3d')}
              >
                3D View
              </button>
            </div>
          </div>

          {viewMode === 'floor' ? (
            <div className="canvas-stats">
              <div>Rooms: <span>{rooms.length}</span></div>
              <div>Area: <span>{totalArea} sq ft</span></div>
              <div>Scale: <span>1 grid = 1 ft</span></div>
            </div>
          ) : (
            <div className="canvas-stats">
              <div>Rooms: <span>{rooms.length}</span></div>
              <div>Selected: <span>{selectedDecorRoom?.name || '—'}</span></div>
            </div>
          )}
        </div>
        
        <div className="canvas-container">
          {viewMode === 'floor' ? (
            <div
              ref={canvasRef}
              className="canvas"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            >
              {/* Rooms */}
              {rooms.map(room => (
                <div
                  key={room.id}
                  className={`room ${selectedId === room.id ? 'selected' : ''} ${currentTool === 'furniture' && hoveredRoomId === room.id ? 'hovered' : ''}`}
                  style={{
                    left: room.x,
                    top: room.y,
                    width: room.width,
                    height: room.height,
                    background: room.color,
                  }}
                  onMouseDown={(e) => handleElementClick(e, room.id, room.x, room.y)}
                >
                  <div className="room-label">{room.name}</div>
                  <div className="room-size">
                    {Math.round(room.width / GRID_SIZE)}' × {Math.round(room.height / GRID_SIZE)}'
                  </div>
                </div>
              ))}

              {/* Walls */}
              {walls.filter(w => w.type === 'wall').map(wall => (
                <div
                  key={wall.id}
                  className={`wall ${selectedId === wall.id ? 'selected' : ''}`}
                  style={{
                    left: wall.x,
                    top: wall.y,
                    width: wall.width,
                    height: wall.height,
                  }}
                  onMouseDown={(e) => handleElementClick(e, wall.id, wall.x, wall.y)}
                />
              ))}

              {/* Doors */}
              {walls.filter(w => w.type === 'door').map(door => (
                <div
                  key={door.id}
                  className={`door ${selectedId === door.id ? 'selected' : ''}`}
                  style={{
                    left: door.x,
                    top: door.y,
                    width: door.width,
                    height: door.height,
                  }}
                  onMouseDown={(e) => handleElementClick(e, door.id, door.x, door.y)}
                />
              ))}

              {/* Windows */}
              {walls.filter(w => w.type === 'window').map(win => (
                <div
                  key={win.id}
                  className={`window-el ${selectedId === win.id ? 'selected' : ''}`}
                  style={{
                    left: win.x,
                    top: win.y,
                    width: win.width,
                    height: win.height,
                  }}
                  onMouseDown={(e) => handleElementClick(e, win.id, win.x, win.y)}
                />
              ))}

              {/* Furniture */}
              {furniture.map(item => (
                <div
                  key={item.id}
                  className={`furniture-item ${selectedId === item.id ? 'selected' : ''}`}
                  style={{
                    left: item.x,
                    top: item.y,
                    width: item.width,
                    height: item.height,
                  }}
                  onMouseDown={(e) => handleElementClick(e, item.id, item.x, item.y)}
                >
                  <span>{item.icon}</span>
                </div>
              ))}

              {/* Drawing preview */}
              {isDrawing && (
                <div
                  className="drawing-preview"
                  style={{
                    left: Math.min(drawStart.x, drawCurrent.x),
                    top: Math.min(drawStart.y, drawCurrent.y),
                    width: Math.abs(drawCurrent.x - drawStart.x),
                    height: Math.abs(drawCurrent.y - drawStart.y),
                  }}
                />
              )}
            </div>
          ) : (
            <div className="decorate-stage">
              {rooms.length === 0 || !selectedDecorRoom ? (
                <div style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.9rem' }}>
                  Create and select a room to decorate.
                </div>
              ) : viewMode === 'decorate' ? (
                <div className="decorate-preview">
                  <div
                    className="preview-room"
                    style={{ borderColor: selectedDecorRoom.wallColor || 'var(--wall-color)' }}
                  >
                    <div
                      className={`preview-room-inner floor-${selectedDecorRoom.floorMaterial || 'wood'}`}
                      style={{ backgroundColor: selectedDecorRoom.floorColor || 'var(--cream)' }}
                    >
                      {furnitureInRoom(selectedDecorRoom).map(item => (
                        <div
                          key={item.id}
                          className={`preview-furniture ${decorateFurnitureId === item.id ? 'active' : ''}`}
                          style={{
                            left: `${((item.x - selectedDecorRoom.x) / selectedDecorRoom.width) * 100}%`,
                            top: `${((item.y - selectedDecorRoom.y) / selectedDecorRoom.height) * 100}%`,
                            width: `${(item.width / selectedDecorRoom.width) * 100}%`,
                            height: `${(item.height / selectedDecorRoom.height) * 100}%`,
                            background: item.fabricColor || 'var(--sand)',
                            borderColor: item.woodColor || 'var(--noir)',
                            transform: `rotate(${item.rotation || 0}deg)`,
                          }}
                          onClick={() => setDecorateFurnitureId(item.id)}
                        >
                          <span>{item.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* ==================== IMMERSIVE 3D VIEW ==================== */}
                  {(() => {
                    const currentView = '3d-view'
                    const selectedRoom = selectedDecorRoom

                    return (
                      <>
                        {currentView === '3d-view' && (
                          <div className="immersive-container">
                            {/* Ambient Light Layers */}
                            <div className="light-layer sunlight" />
                            <div className="light-layer ambient-glow" />

                            {/* Light Beams from Window */}
                            <div className="light-beams">
                              <div className="beam beam-1" />
                              <div className="beam beam-2" />
                              <div className="beam beam-3" />
                            </div>

                            {/* Floating Dust Particles (client-generated for hydration safety) */}
                            <div className="dust-container">
                              {dustParticles.map(p => (
                                <div
                                  key={p.id}
                                  className="dust-particle"
                                  style={{
                                    left: `${p.left}%`,
                                    animationDuration: `${p.duration}s`,
                                    animationDelay: `${p.delay}s`,
                                    opacity: p.opacity,
                                  }}
                                />
                              ))}
                            </div>

                            {/* Room Structure */}
                            <div className="room-scene">
                              {/* Back Wall */}
                              <div
                                className="wall-back"
                                style={{
                                  background: selectedRoom?.wallColor
                                    ? `linear-gradient(180deg, ${selectedRoom.wallColor} 0%, ${selectedRoom.wallColor}ee 100%)`
                                    : 'linear-gradient(180deg, #faf8f5 0%, #f5f0e8 60%, #ebe5db 100%)',
                                }}
                              />

                              {/* Floor */}
                              <div
                                className="floor-surface"
                                style={{
                                  background: selectedRoom?.floorColor
                                    ? `linear-gradient(180deg, ${selectedRoom.floorColor} 0%, ${selectedRoom.floorColor}dd 100%)`
                                    : 'linear-gradient(180deg, #e8e0d4 0%, #d4c8b8 100%)',
                                }}
                              />

                              {/* Window */}
                              <div className="window-frame">
                                <div className="window-glass" />
                                <div className="window-divider-v" />
                                <div className="window-divider-h" />
                                <div className="window-sill" />
                              </div>

                              {/* ==================== FURNITURE ==================== */}
                              <div className="furniture-scene">
                                {/* Render furniture that's in the selected room */}
                                {furniture
                                  .filter(f => {
                                    if (!selectedRoom) return false
                                    const cx = f.x + f.width / 2
                                    const cy = f.y + f.height / 2
                                    return (
                                      cx >= selectedRoom.x &&
                                      cx <= selectedRoom.x + selectedRoom.width &&
                                      cy >= selectedRoom.y &&
                                      cy <= selectedRoom.y + selectedRoom.height
                                    )
                                  })
                                  .map(item => {
                                    const furnitureType = item.type.toLowerCase()

                                    return (
                                      <div key={item.id} className={`furniture-piece furn-${furnitureType}`}>
                                        {/* SOFA */}
                                        {(furnitureType === 'sofa' || furnitureType.includes('sofa')) && (
                                          <div className="css-sofa">
                                            <div className="sofa-back" />
                                            <div className="sofa-seat" />
                                            <div className="sofa-arm-left" />
                                            <div className="sofa-arm-right" />
                                            <div className="sofa-cushion c1" />
                                            <div className="sofa-cushion c2" />
                                            <div className="sofa-cushion c3" />
                                            <div className="sofa-leg l1" />
                                            <div className="sofa-leg l2" />
                                            <div className="sofa-leg l3" />
                                            <div className="sofa-leg l4" />
                                            <div className="furniture-shadow sofa-shadow" />
                                          </div>
                                        )}

                                        {/* ARMCHAIR / CHAIR */}
                                        {(furnitureType === 'armchair' || furnitureType === 'chair') && (
                                          <div className="css-chair">
                                            <div className="chair-back" />
                                            <div className="chair-seat" />
                                            <div className="chair-arm-left" />
                                            <div className="chair-arm-right" />
                                            <div className="chair-leg cl1" />
                                            <div className="chair-leg cl2" />
                                            <div className="furniture-shadow chair-shadow" />
                                          </div>
                                        )}

                                        {/* COFFEE TABLE */}
                                        {(furnitureType === 'coffee-table' || furnitureType.includes('coffee')) && (
                                          <div className="css-coffee-table">
                                            <div className="table-top" />
                                            <div className="table-leg tl1" />
                                            <div className="table-leg tl2" />
                                            <div className="furniture-shadow table-shadow" />
                                          </div>
                                        )}

                                        {/* DINING TABLE */}
                                        {(furnitureType === 'dining-table' || furnitureType.includes('dining')) && (
                                          <div className="css-dining-table">
                                            <div className="dining-top" />
                                            <div className="dining-leg dl1" />
                                            <div className="dining-leg dl2" />
                                            <div className="dining-leg dl3" />
                                            <div className="dining-leg dl4" />
                                            <div className="furniture-shadow dining-shadow" />
                                          </div>
                                        )}

                                        {/* BED */}
                                        {(furnitureType === 'bed' || furnitureType.includes('bed')) && (
                                          <div className="css-bed">
                                            <div className="bed-frame" />
                                            <div className="bed-mattress" />
                                            <div className="bed-pillow p1" />
                                            <div className="bed-pillow p2" />
                                            <div className="bed-headboard" />
                                            <div className="furniture-shadow bed-shadow" />
                                          </div>
                                        )}

                                        {/* FLOOR LAMP */}
                                        {(furnitureType === 'floor-lamp' || furnitureType.includes('lamp')) && (
                                          <div className="css-lamp">
                                            <div className="lamp-shade" />
                                            <div className="lamp-pole" />
                                            <div className="lamp-base" />
                                            <div className="lamp-glow" />
                                            <div className="furniture-shadow lamp-shadow" />
                                          </div>
                                        )}

                                        {/* PLANT */}
                                        {(furnitureType === 'plant' || furnitureType.includes('plant')) && (
                                          <div className="css-plant">
                                            <div className="plant-leaves">
                                              <div className="leaf lf1" />
                                              <div className="leaf lf2" />
                                              <div className="leaf lf3" />
                                              <div className="leaf lf4" />
                                              <div className="leaf lf5" />
                                            </div>
                                            <div className="plant-pot" />
                                            <div className="furniture-shadow plant-shadow" />
                                          </div>
                                        )}

                                        {/* DESK */}
                                        {(furnitureType === 'desk' || furnitureType.includes('desk')) && (
                                          <div className="css-desk">
                                            <div className="desk-top" />
                                            <div className="desk-leg dkl1" />
                                            <div className="desk-leg dkl2" />
                                            <div className="furniture-shadow desk-shadow" />
                                          </div>
                                        )}

                                        {/* BOOKSHELF */}
                                        {(furnitureType === 'bookshelf' || furnitureType.includes('book')) && (
                                          <div className="css-bookshelf">
                                            <div className="shelf-frame" />
                                            <div className="shelf s1" />
                                            <div className="shelf s2" />
                                            <div className="shelf s3" />
                                            <div className="books b1" />
                                            <div className="books b2" />
                                            <div className="furniture-shadow shelf-shadow" />
                                          </div>
                                        )}

                                        {/* DEFAULT - Generic furniture */}
                                        {!['sofa', 'armchair', 'chair', 'coffee-table', 'dining-table', 'bed', 'floor-lamp', 'lamp', 'plant', 'desk', 'bookshelf'].some(t =>
                                          furnitureType.includes(t)
                                        ) && (
                                          <div className="css-generic">
                                            <div className="generic-body" style={{ background: item.fabricColor || '#d4c8b8' }} />
                                            <div className="furniture-shadow generic-shadow" />
                                          </div>
                                        )}
                                      </div>
                                    )
                                  })}
                              </div>

                              {/* Room Label */}
                              <div className="room-label">
                                <span className="label-category">Interior</span>
                                <span className="label-name">{selectedRoom?.name || 'Living Room'}</span>
                              </div>
                            </div>

                            {/* No Room Selected Message */}
                            {!selectedRoom && rooms.length > 0 && (
                              <div className="select-room-prompt">
                                <p>Select a room from the left panel</p>
                              </div>
                            )}

                            {/* No Rooms Created Message */}
                            {rooms.length === 0 && (
                              <div className="select-room-prompt">
                                <p>Create a room in Floor Plan first</p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )
                  })()}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">{viewMode === 'floor' ? 'Design Tools' : 'Decor Options'}</div>
        </div>

        <div className="panel-body">
          {viewMode === 'floor' ? (
            <>
              {/* Selected item info */}
              {selectedId && (
                <div className="section">
                  <div className="selected-info">
                    <div className="selected-label">Selected</div>
                    <div className="selected-name">
                      {furniture.find(f => f.id === selectedId)?.name ||
                        rooms.find(r => r.id === selectedId)?.name ||
                        walls.find(w => w.id === selectedId)?.type ||
                        'Element'}
                    </div>
                    <div className="selected-actions">
                      {furniture.find(f => f.id === selectedId) && (
                        <button className="action-btn" onClick={rotateSelected}>
                          ↻ Rotate
                        </button>
                      )}
                      <button className="action-btn danger" onClick={deleteSelected}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Room Types */}
              {currentTool === 'room' && (
                <div className="section">
                  <div className="section-title">Room Type</div>
                  <div className="room-types">
                    {roomColors.map((room, idx) => (
                      <div
                        key={room.name}
                        className={`room-type ${selectedRoomType === idx ? 'active' : ''}`}
                        onClick={() => setSelectedRoomType(idx)}
                      >
                        <div className="room-type-color" style={{ background: room.color }} />
                        <span className="room-type-name">{room.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Furniture Catalog */}
              {currentTool === 'furniture' && (
                <div className="section">
                  <div className="section-title">Furniture</div>
                  <div className="furniture-grid">
                    {furnitureCatalog.map(item => (
                      <div
                        key={item.type}
                        className={`furniture-option ${selectedFurniture?.type === item.type ? 'active' : ''}`}
                        onClick={() => setSelectedFurniture(item)}
                      >
                        <span>{item.icon}</span>
                        <small>{item.name}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="section">
                <div className="section-title">How to Use</div>
                <div className="instructions">
                  <strong>Room:</strong> Click & drag to draw<br />
                  <strong>Wall:</strong> Click & drag to draw<br />
                  <strong>Door/Window:</strong> Click to place<br />
                  <strong>Furniture:</strong> Select item, then click<br />
                  <strong>Select:</strong> Click to select, drag to move<br />
                </div>
              </div>
            </>
          ) : (
            <>
              {!selectedDecorRoom ? (
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                  Select a room on the left.
                </div>
              ) : (
                <>
                  <div className="section">
                    <div className="section-title">Wall Color</div>
                    <div className="room-types">
                      {wallColorOptions.map(opt => (
                        <div
                          key={opt.name}
                          className={`room-type ${(selectedDecorRoom.wallColor || 'var(--wall-color)') === opt.value ? 'active' : ''}`}
                          onClick={() => {
                            setRooms(prev => prev.map(r => r.id === selectedDecorRoom.id ? { ...r, wallColor: opt.value } : r))
                          }}
                        >
                          <div className="room-type-color" style={{ background: opt.value }} />
                          <span className="room-type-name">{opt.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <div className="section-title">Floor</div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      {floorMaterialOptions.map(opt => (
                        <button
                          key={opt.value}
                          className="action-btn"
                          style={{
                            borderColor: (selectedDecorRoom.floorMaterial || 'wood') === opt.value ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                            color: (selectedDecorRoom.floorMaterial || 'wood') === opt.value ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                          }}
                          onClick={() => setRooms(prev => prev.map(r => r.id === selectedDecorRoom.id ? { ...r, floorMaterial: opt.value } : r))}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>

                    <div className="room-types">
                      {floorColorOptions.map(opt => (
                        <div
                          key={opt.name}
                          className={`room-type ${(selectedDecorRoom.floorColor || 'var(--cream)') === opt.value ? 'active' : ''}`}
                          onClick={() => setRooms(prev => prev.map(r => r.id === selectedDecorRoom.id ? { ...r, floorColor: opt.value } : r))}
                        >
                          <div className="room-type-color" style={{ background: opt.value }} />
                          <span className="room-type-name">{opt.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <div className="section-title">Furniture</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                      {furnitureInRoom(selectedDecorRoom).length === 0 ? (
                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                          No furniture in this room.
                        </div>
                      ) : (
                        furnitureInRoom(selectedDecorRoom).map(item => (
                          <div
                            key={item.id}
                            className={`room-row ${decorateFurnitureId === item.id ? 'active' : ''}`}
                            onClick={() => setDecorateFurnitureId(item.id)}
                          >
                            <div className="room-row-name">{item.icon} {item.name}</div>
                            <div className="room-row-chip" style={{ background: item.fabricColor || 'var(--sand)' }} />
                          </div>
                        ))
                      )}
                    </div>

                    {selectedDecorFurniture && (
                      <>
                        <div className="section-title">Fabric</div>
                        <div className="room-types" style={{ marginBottom: 12 }}>
                          {fabricColorOptions.map(opt => (
                            <div
                              key={opt.name}
                              className={`room-type ${(selectedDecorFurniture.fabricColor || 'var(--sand)') === opt.value ? 'active' : ''}`}
                              onClick={() => setFurniture(prev => prev.map(f => f.id === selectedDecorFurniture.id ? { ...f, fabricColor: opt.value } : f))}
                            >
                              <div className="room-type-color" style={{ background: opt.value }} />
                              <span className="room-type-name">{opt.name}</span>
                            </div>
                          ))}
                        </div>

                        <div className="section-title">Wood / Trim</div>
                        <div className="room-types">
                          {woodColorOptions.map(opt => (
                            <div
                              key={opt.name}
                              className={`room-type ${(selectedDecorFurniture.woodColor || 'var(--noir)') === opt.value ? 'active' : ''}`}
                              onClick={() => setFurniture(prev => prev.map(f => f.id === selectedDecorFurniture.id ? { ...f, woodColor: opt.value } : f))}
                            >
                              <div className="room-type-color" style={{ background: opt.value }} />
                              <span className="room-type-name">{opt.name}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* VERA */}
      <VeraBubble
        isPremium={false}
        context="design"
        onUpgradeClick={() => { window.location.href = '/pricing' }}
      />
    </div>
  )
}

export default function VDSDesignPage() {
  return (
    <Suspense fallback={
      <div style={{
        width: '100%',
        height: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8f6f1',
      }}>
        Loading...
      </div>
    }>
      <VDSFloorPlan />
    </Suspense>
  )
}