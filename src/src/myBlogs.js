import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import {Button} from 'reactstrap'

function MyBlogs(props) {
    var [blogs, setBlogs] = React.useState([]);
    var his = useHistory();
    React.useEffect(() => {
        axios.post("http://localhost:5050/api/getmyblogs", {creator: props.creator}).then((res) => {
            setBlogs(res.data);
        })
    }, [props.creator])

    const handleNew = async () => {
        await axios.post("http://localhost:5050/api/newblog", {creator: props.creator}).then((res) => {
            props.setCurrent(res.data);
            his.push('/editor');
        })
    }

    const openBlog = (id) => {
        props.setCurrent(id);
        his.push('/editor');
    }

    return (
        <>
        <Button onClick={() => handleNew()} color="primary" >Create a New Blog</Button>
        <h1>My Blogs</h1>
        {blogs.map(data => {
            return (
            <>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderWidth: 2, borderColor: 'black', border: 'solid', marginTop: '5%', marginBottom: '5%'}} >
            <img src={data.banner} alt="err" onClick={() => openBlog(data._id)} />
            <div>
                <p onClick={() => openBlog(data._id)} style={{fontSize: 40}} >{data.title}</p>
                <p>{data.caption}</p>
                <p style={{fontFamily: "Poppins", margin: 0}} >#{data.hashtag}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#949799', fontFamily: "Poppins"}} >{data.readTime} minutes read</span></p>
            </div>
            </div>
        </>
         )
        })
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        creator: state.creator
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrent: data => {
            dispatch({
                type: "SET_ID",
                data: data,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs)