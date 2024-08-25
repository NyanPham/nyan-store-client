export default function getMatchedButton(e, btnSelector) {
    let button
    if (e.target.matches(btnSelector)) {
        button = e.target
    }
    if (e.target.closest(btnSelector) != null) button = e.target.closest(btnSelector)

    return button
}
