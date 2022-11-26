import Link from 'next/link';
import classes from './Button.module.css';

interface ILayoutProps {
  children?: React.ReactNode;
  link?: string;
}

const Button: React.FC<ILayoutProps> = ({ children, link }) => {
  return (
    <>
      {link ? (
        <Link className={classes.btn} href={link}>
          {children}
        </Link>
      ) : (
        <button className={classes.btn} onClick={() => console.log()}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
