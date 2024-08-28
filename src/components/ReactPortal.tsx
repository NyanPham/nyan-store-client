import { createPortal } from 'react-dom'

type ReactPortalProps = {
    children: React.ReactNode
    containerId: string 
}

function ReactPortal({ children, containerId }: ReactPortalProps) {
    let container = document.getElementById(containerId)
    if (!container) {
        container = createWrapperAndAppendToBody(containerId)
    }

    return createPortal(children, container)
}

function createWrapperAndAppendToBody(containerId: string) {
    const container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)
    
    return container
}

export default ReactPortal
