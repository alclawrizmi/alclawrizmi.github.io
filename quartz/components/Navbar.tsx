import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface NavbarOptions {
    links: Record<string, string>
}

export default ((userOpts?: NavbarOptions) => {
    const Navbar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
        const links = userOpts?.links ?? {}
        return (
            <nav class={classNames(displayClass, "navbar")}>
                <ul class="navbar-list">
                    {Object.entries(links).map(([text, link]) => (
                        <li class="navbar-item">
                            <a href={link}>{text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    Navbar.css = `
  .navbar {
    margin-bottom: 1rem;
    font-family: var(--codeFont);
  }
  .navbar-list {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
  }
  .navbar-item a {
    text-decoration: none;
    color: var(--secondary);
    font-weight: bold;
  }
  .navbar-item a:hover {
    text-decoration: underline;
  }
  `

    return Navbar
}) satisfies QuartzComponentConstructor
