import './App.css';

import NavbarComponent from './components/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import { loadGooloo } from './services/gooloo';

const displayGooloo = (data, element) => {
    if(data) {
      const keys = Object.keys(data);
      const result = keys.map(k => ({
          url: data[k],
          type: k
      }));

      loadGooloo(result, element);
    }
};

const App = () => {
  const maleGooloo = useRef(null);
  const femaleGooloo = useRef(null);
  const [selectedMale, setSelectedMale] = useState(null);
  const [selectedFemale, setSelectedFemale] = useState(null);

  const getGooloo = (sm, sf) => {
    setSelectedMale(sm);
    setSelectedFemale(sf);
  };

  useEffect(() => {
    displayGooloo(selectedMale, maleGooloo.current);
    displayGooloo(selectedFemale, femaleGooloo.current);
  }, [selectedMale, selectedFemale]);

  return (
    <div className="App">
      <NavbarComponent getGooloo={getGooloo} />
      <Container>
        <Row style={{marginTop: '10px'}}>
          <Col>
            <h4>Male Gooloo</h4>
          </Col>
          <Col>
            <h4>Female Gooloo</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <svg id="gooloo-male" className="gooloo-svg" ref={maleGooloo}></svg>
          </Col>
          <Col>
            <svg id="gooloo-female" className="gooloo-svg" ref={femaleGooloo}></svg>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
