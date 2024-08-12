import styles from "./index.module.scss";

interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return <div className={styles.myComponent}>Hello, {name}!</div>;
};

export default MyComponent;
