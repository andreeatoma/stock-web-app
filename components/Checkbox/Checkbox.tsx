import React from 'react';

interface State {
    isChecked: boolean;
}
interface Props {
    value: number;
}
export default class Checkbox extends React.Component<Props, State>{
    constructor(props){
        super(props)
        this.state={
            isChecked:false
        }
    }
    
    handleCheck = () => {
        const { isChecked } = this.state;
        this.setState({
            isChecked:!isChecked
        })
    }
    
    render(){
        const { isChecked } = this.state;
        let { value } = this.props;
        
        if(isChecked){
           value
        }else{
           value = null;
        }
        return(
            <div>
                <label htmlFor="average">Calculate stock average</label>
                <input type="checkbox" 
                onChange={this.handleCheck}
                defaultChecked={isChecked}
                id="average"
                />
                <p>{value}</p>
            </div>
        )
    }
}