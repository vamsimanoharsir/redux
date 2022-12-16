const redux=require('redux')
const reduxStore=redux.createStore

const buycake='buy cake'
const buyice='buy ice'

//1)create action inside function
//action creator is a function that returns an action
function buycake1(){
    return { //action is simply an object with a 'type' property
        type:buycake,
        info:'purchased the cake'
    }
}
function buyice1(){
    return{
        type:buyice,
        info:'purchased ice'
    }
}

//2)create reducer
//initialstate of our application
const initialstate={
    noOfCakes:10,
    noOfIce:20
}

const reducer=(state=initialstate, action)=>{  //one reducer has two variables in one state
    switch(action.type){
        case buycake:return {...state,noOfCakes:state.noOfCakes+1}
        case buyice:return {...state,noOfIce:state.noOfIce+1}
        default : return state
    }
}


//3)create store
const store=reduxStore(reducer)
console.log('initial state : ',store.getState())//store has the entire state of our application
const unsubscribe=store.subscribe(()=>console.log('updated state : ',store.getState()))
store.dispatch(buycake1()) //flow : dispatch -> action returned -> reducer updates state
store.dispatch(buycake1())
store.dispatch(buycake1()) 
store.dispatch(buyice1())
store.dispatch(buyice1())
store.dispatch(buyice1())
unsubscribe()