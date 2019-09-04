import React, { useState } from 'react';

function Home(props) {
  const [token, setToken] = useState('');
  const handle = (event) =>{
    event.preventDefault();
    // console.log(token)
    props.history.push("/Room/"+ token);
  }

  return (
    <div>
      <h1>
        遠端點播系統
      </h1>
      <p>
        此網站為遠端點播系統，使用Youtube Player API
      </p>
      <p>
        使用本服務需創建房間，<a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">連結網址</a>
      </p>
      <hr />
      <form onSubmit={(e)=>handle(e)}>
        <h3>進入房間</h3>
        <label>房間名稱:</label>
        <input type="text" value={token} onChange={(e)=>setToken(e.target.value)} />
        <button>加入</button>
      </form>
    </div>
  );
}

export default Home