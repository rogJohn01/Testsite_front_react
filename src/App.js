import Sidebar from './components/Common/Sidebar';
import { useContext, useState } from 'react';
import SetupForm from './components/SetupForm/SetupForm';
import Flash7 from './components/Flashcard/flashcard';
import { wordContext } from './contexts/wordContext';
import ResultTable from './pages/resultTable';
import { Route, Switch, Redirect } from 'react-router-dom';
import Take_test from './pages/take_test';
import Home from './pages/home';
import Review_table from './pages/review_link';
import StartDrill from './pages/startDrill';
import Statistics from "./pages/statistics";



function App() {

  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const {ready , setReady} = useContext(wordContext)


  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

   // Add styles for the layout container
   const layoutStyle = {
    display: 'flex',
    alignItems: 'stretch',
    height: '100vh' // This assumes that you want your app to fill the viewport height
  };

  // Add styles for the content area
  const contentStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Change 'center' to 'flex-start'
    overflowY: 'auto' // In case your content needs to scroll
  };


  return (
    <div style={layoutStyle}>
     <Sidebar
        image={image}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
            <div style={contentStyle}>

    <Switch>
          <Route path='/reviewTable/:test_id'  component={Review_table} /> 
          <Route path="/ResultTable" component={ResultTable} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/Take_test" component={Take_test} />
          <Route path="/TakeDrill" component={StartDrill} />
          <Route path='/home' component={Home} /> 
          <Route path='/' component={Home} / > 
    </Switch>
    </div>

    </div>
  );
}

export default App;
