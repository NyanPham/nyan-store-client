export default function getMatchedButton(e: React.MouseEvent<HTMLButtonElement>, btnSelector: string) {
    let button
    const element = e.target as HTMLElement
    
    if (element.matches(btnSelector)) {
        button = element as HTMLButtonElement
    } else if (element.closest(btnSelector) != null) {
        button = element.closest(btnSelector)
    }

    return button as  HTMLButtonElement
}
