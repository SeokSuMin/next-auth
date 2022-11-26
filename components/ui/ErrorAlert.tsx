import classes from './error-alert.module.css';

interface IErrorAlertProps {
  children?: React.ReactNode;
}

const ErrorAlert: React.FC<IErrorAlertProps> = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
