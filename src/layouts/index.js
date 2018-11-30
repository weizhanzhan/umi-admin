import styles from './index.css';

function BasicLayout(props) {
  console.log(props)
  return (
    <div >
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      { props.children }
    </div>
  );
}

export default BasicLayout;
