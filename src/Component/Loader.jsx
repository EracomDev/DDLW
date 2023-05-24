import React from 'react'
import './Loader.css'
const Loader = () => {
    return (
        <div className="spinner-box">
            <div className="scene">
                <div className="cube-wrapper">
                    <div className="cube">
                        <div className="cube-faces">
                            <div className="cube-face shadow d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                            <div className="cube-face bottom d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                            <div className="cube-face top d-flex align-items-center justify-content-center" style={{ color: "white", margin: "auto" }}>D D L W</div>
                            <div className="cube-face left d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                            <div className="cube-face right d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                            <div className="cube-face back d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                            <div className="cube-face front d-flex align-items-center justify-content-center" style={{ color: "white" }}>D D L W</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader