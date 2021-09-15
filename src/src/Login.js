import * as React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

function Login(props) {
    const [cred, setCred] = React.useState({username: "", password: ""});
    var his = useHistory();

    const submitCred = () => {
        axios.post('http://localhost:5050/api/login', cred)
        .then(() => {
            // auth();
            props.setCreator(cred.username)
            his.push('/myblogs')
        })
        .catch((e) => alert(e));
      }
    
    return (
        <>
        <div>
          <p>Username:</p>
          <input onChange={(e) => setCred({...cred, username: e.target.value})} value={cred.username} />
          <p>Password:</p>
          <input security onChange={(e) => setCred({...cred, password: e.target.value})} value={cred.password}  />
        </div>
        <button onClick={() => submitCred()} >Submit</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCreator: data => {
            dispatch({
                type: "LOGIN",
                data: data,
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Login);