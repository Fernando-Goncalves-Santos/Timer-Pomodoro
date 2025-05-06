import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type AvailableThemes = "dark" | "light";

export const Menu = () => {
  const [theme, setTheme] = useState<AvailableThemes>(localStorage.getItem('theme') as AvailableThemes || 'dark');

  const handleTheme = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])


  const nextTheme = {
    dark: <SunIcon/>,
    light: <MoonIcon/>
  }

  return (
    <nav className={styles.menu}>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Home"
      >
        <HouseIcon />
      </a>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para o Historico"
        title="Historico"
      >
        <HistoryIcon />
      </a>
      <a
        href="#"
        className={styles.menuLink}
        aria-label="Ir para as Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        href="Mudar Tema"
        className={styles.menuLink}
        aria-label="Mudar Tema"
        title="Tema"
        onClick={handleTheme}
      >
        {nextTheme[theme]}
      </a>
    </nav>
  );
};
