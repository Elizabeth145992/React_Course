import {useSelector, useDispatch/*, connect*/} from 'react-redux';
//import { Component } from 'react';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter); //Acceder a los datos manejados por Redux
  const showCounter = useSelector(state => state.showCounter);

  function counterHandler(operation){
    if(operation === '+'){
      dispatch({ type: 'increment' });
    } else if(operation === '-') {
      dispatch({ type: 'decrement' });
    } else if(operation === '++'){
      dispatch({type: 'increase', amount: 5});
    } else if(operation === '--'){
      dispatch({type: 'toggle'});
    }
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => counterHandler('+')}>Increment</button>
        <button onClick={() => counterHandler('++')}>Increase by 5</button>
        <button onClick={() => counterHandler('-')}>Decrement</button>
      </div>
      <button onClick={() => counterHandler('--')}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

//Ejemplo con uso de componentes con clase
/*class Counter extends Component {
  counterHandler(oper) {
      if(oper === '+'){
        this.props.increment();
      }else{
        this.props.decrement();
      }
    }

    toggleCounterHandler() {}
  render(){
    return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{this.props.counter}</div>
      <div>
        {/* no need to call .bind() on the result of counterHandler;
            the arrow function already preserves `this` and passes the arg *//*}
        <button onClick={() => this.counterHandler('+')}>Increment</button>
        <button onClick={() => this.counterHandler('-')}>Decrement</button>
        {/* alternatively you could bind once: *//*}
        {/* <button onClick={this.counterHandler.bind(this, '+')}>Increment</button> *//*}
      </div>
      <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
  }  
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);*/


