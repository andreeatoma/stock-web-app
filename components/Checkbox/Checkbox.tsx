import React from "react";

interface State {
  isChecked: boolean;
}
interface Props {
  onChecked: () => number;
}
export default class Checkbox extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  onCheck = () => {
    const { onChecked } = this.props;
    const { isChecked } = this.state;

    this.setState({
      isChecked: !isChecked,
    });
    
    onChecked();
  };


  render() {
    const { isChecked } = this.state;
    let {  onChecked } = this.props;

    
    return (
      <div>
        <label htmlFor="average">Calculate stock average</label>
        <input
          type="checkbox"
          onChange={this.onCheck}
          defaultChecked={isChecked}
          name="average"
          id="average"
        />
      </div>
    );
  }
}
