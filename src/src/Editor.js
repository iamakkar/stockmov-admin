import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { Button, Input } from 'reactstrap';
import '../../node_modules/react-quill/dist/quill.snow.css'

function Editor(props) {

    React.useEffect(() => {
        axios.post("http://localhost:5050/api/getblog", {id: props.blog._id}).then((res) => {
            console.log(res.data)
            // setBlog(res.data);
            props.setTitle(res.data.title);
            props.setCaption(res.data.caption);
            props.setBanner(res.data.banner);
            props.setContent(res.data.content);
            props.setHashtag(res.data.hashtag);
            props.setReadTime(res.data.readTime);
        })
    }, [])
    
    const handleSave = () => {
        try {
            axios.post("http://localhost:5050/api/saveblog", props.blog).then((res) => {
                alert(res.data);
            })
        } catch(e) {
            alert(e);
        }
    }

    const handlePublish = () => {
        handleSave();
        try {
            axios.post("http://localhost:5050/api/publishblog", {title: props.blog.title}).then((res) => {
                alert(res.data);
            })
        } catch(e) {
            alert(e);
        }
    }

    const handleUnPublish = () => {
        try {
            axios.post("http://localhost:5050/api/unpublishblog", {title: props.blog.title}).then((res) => {
                alert(res.data);
            })
        } catch(e) {
            alert(e);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

    const handleUpload = async (e) => {
        let base = await toBase64(e[0]);
        // console.log(base)
        props.setBanner(base);
    }

    const uploadImage = async () => {
        console.log(props.blog.banner)
        await axios.post("http://localhost:5050/api/uploadimage", {b64: props.blog.banner}).then((res) => {
            // console.log(res.data);
            props.setBanner(res.data);
            alert("Image Uploaded! Press save to save your changes")
        })
    }

    var his = useHistory();
    return (
        <div>
            <h1>Blog Editor</h1>
            <ReactQuill value={props.blog.content} onChange={(value) => props.setContent(value)} />
            <p>Title:</p>
            <Input value={props.blog.title} onChange={(val) => props.setTitle(val.target.value)} />
            <br/>
            <p>Caption:</p>
            <Input value={props.blog.caption} onChange={(val) => props.setCaption(val.target.value)} />
            <br/>
            <p>readtime:</p>
            <Input value={props.blog.readTime} onChange={(val) => props.setReadTime(Number(val.target.value))} />
            <br/>
            <p>Hashtag:</p>
            <Input value={props.blog.hashtag} onChange={(val) => props.setHashtag(val.target.value)} />
            <br/>
            <p>Banner Image:</p>
            <input type='file' onChange={(val) => handleUpload(val.target.files)} />
            <img src={props.blog.banner} alt="preview" />
            <Button color="primary" disabled={!(props.blog.banner)} onClick={() => uploadImage()} >Select this image</Button>
            <br/>
            <br/>
            <Button onClick={() => his.goBack()} color="warning" >My Blogs</Button>
            <Button onClick={() => handleSave()} color="success" >Save Blog</Button>
            <Button onClick={() => handlePublish()} color="primary" >Publish Blog</Button>
            <Button onClick={() => handleUnPublish()} color="danger" >Unublish Blog</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blog: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: data => {
            dispatch({
                type: "SET_TITLE",
                data: data,
            })
        },
        setCaption: data => {
            dispatch({
                type: "SET_CAPTION",
                data: data,
            })
        },
        setBanner: data => {
            dispatch({
                type: "SET_BANNER",
                data: data,
            })
        },
        setContent: data => {
            dispatch({
                type: "SET_CONTENT",
                data: data,
            })
        },
        setHashtag: data => {
            dispatch({
                type: "SET_HASHTAG",
                data: data,
            })
        },
        setReadTime: data => {
            dispatch({
                type: "SET_READTIME",
                data: data,
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);