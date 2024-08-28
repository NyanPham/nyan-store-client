type ContainerProps = {
    children: React.ReactNode
}

function Container({ children }: ContainerProps) {
    return <div className="px-3 md:px-8 lg:px-16">{children}</div>
}

export default Container
