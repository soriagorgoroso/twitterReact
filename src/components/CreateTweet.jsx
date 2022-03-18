import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import actions from "../redux/tweetActions";

function CreateTweet() {
  const [newTweetContent, setNewTweetContent] = useState("");
  const dispatch = useDispatch();
  const sessionData = useSelector((state) => state.users[0]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!newTweetContent) return;
    const tweetData = {
      content: newTweetContent,
      author: {
        username: sessionData.username,
        firstname: sessionData.firstname,
        lastname: sessionData.lastname,
        avatar: sessionData.avatar,
      },
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/tweets",
        tweetData,
        { headers: { Authorization: `Bearer ${sessionData.token}` } }
      );
      console.log(response.data);
      console.log(tweetData);
      dispatch(actions.create(tweetData));
    } catch (error) {
      console.log(error);
    }
    setNewTweetContent("");
  };

  return (
    <Row className="py-2 bg-black text-light mx-1 border-bottom">
      <Col sm={2}>
        <img src="" alt="Avatar" />
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            style={{ height: "8rem" }}
            className="bg-black text-light"
            placeholder="What's happening?"
            value={newTweetContent}
            onChange={(e) => setNewTweetContent(e.target.value)}
          />
          <Button
            variant="primary"
            className="rounded-pill fw-bold mt-2"
            type="submit"
          >
            Tweet
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default CreateTweet;
