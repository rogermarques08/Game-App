import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  return (
    <header>
      <button type="button" onClick={ () => history.push('/list') }>Game List</button>
    </header>
  );
}

export default Header;
