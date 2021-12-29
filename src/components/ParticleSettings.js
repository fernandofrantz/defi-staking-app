import React , {Component} from 'react'
import Particles from 'react-tsparticles'

class ParticleSettings extends Component {
    render() {
        return (
            <div>
                <Particles
                    height='1000px'
                    width='100vw'
                    id='tsparticles'
                    options={{
                        background: {
                            color: {
                                value: '#0d47a1'
                            },
                        },
                        fpsLimit:120,
                        interactivity: {
                            detect_on: 'canvas',
                            events: {
                                onClick: {
                                    enable: 'true',
                                    mode: 'push'
                                },
                                onHover: {
                                    enable: 'true',
                                    mode: 'repulse'
                                },
                                resize: 'true',
                            },
                            modes: {
                                bubble: {
                                    distance: 400,
                                    duration: 2,
                                    opacity: 0.8,
                                    size: 40,
                                },
                                push: {
                                    quantity: 4
                                },
                                repulse: {
                                    distance: 150,
                                    duration: 0.4
                                },
                            },
                        }, 
                        particles: {
                            color: {
                                value: '#ffffff'
                            },
                            links: {
                                color: '#ffffff',
                                distance: 200,
                                enable: true,
                                opacity: 0.6,
                                width: 1,
                            },
                            colisions: {
                                enable: true,
                            },
                            move: {
                                direction: 'none',
                                enable: true,
                                outMode: 'bounce',
                                random: false,
                                speed: 1.5,
                                straight: false,
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default ParticleSettings