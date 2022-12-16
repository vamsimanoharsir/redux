const redux=require('redux')
const reduxStore=redux.createStore
const combineReducers = redux.combineReducers

const buycake='buy cake'
const buyice='buy ice'

//1)create action inside function
//action creator is a function that returns an action
function buycake1(){
    return { //action is simply an object with a 'type' property
        type:buycake,
    }
}
function buyice1(){
    return{
        type:buyice,
    }
}

//2)create reducer
//initialstate of our application
const initialstate={
    noOfCakes:10,
}
 
const initialstate1={ //two separate initials states because two separate reducers
  noOfIce:10,
}

const reducer=(state=initialstate, action)=>{
    switch(action.type){
        case buycake:return {...state,noOfCakes:state.noOfCakes+1}
        default : return state
    }
}

const reducer1=(state=initialstate1, action)=>{
  switch(action.type){
      case buyice:return {...state,noOfIce:state.noOfIce+1}
      default : return state
  }
}

//now we can only pass one reducer to createStore func. so we need to combine these two reducers
const rootReducer=combineReducers({
  cake:reducer,
  ice:reducer1
})

//3)create store
const store=reduxStore(rootReducer) 
console.log('initial state : ',store.getState())
const unsubscribe=store.subscribe(()=>console.log('updated state : ',store.getState()))
store.dispatch(buycake1()) //flow : dispatch -> action -> reducer updates state
store.dispatch(buycake1())
store.dispatch(buycake1()) 
store.dispatch(buyice1())
store.dispatch(buyice1())
store.dispatch(buyice1())
unsubscribe()