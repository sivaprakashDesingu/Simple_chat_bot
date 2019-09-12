import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import './styles.css'
// const handle = (props) => {
//     const { value, dragging, index, ...restProps } = props;
//     return (
//       <Tooltip
//         prefixCls="rc-slider-tooltip"
//         overlay={value}
//         visible={dragging}
//         placement="top"
//         key={index}
//       >
//         <Handle value={value} {...restProps} />
//       </Tooltip>
//     );
//   };

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class Sliders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rangeSliderValue: 0,
            answerVisible: false
        }
    }
    handleSlider(evt) {
        const { value, dragging, index, ...restProps } = evt;

        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    }

    updateaSliderValue(evt) {
        this.setState({ rangeSliderValue: evt })
    }

    handleAnswer() {
        this.setState({answerVisible:true})
        this.props.triggerNextStep({ value: this.state, trigger: this.props.nextStepIs })
    }

    render() {
        console.log(this.props)
        let options = this.props.options.split(",")
        console.log(options)


        return (
            <div className="Rangeslider">
                {this.state.answerVisible ? <span>{this.state.rangeSliderValue}</span> :
                    <div className="rangeSliderinnerwrapper">
                        <div className="rsc-ts rsc-ts-bot sc-dnqmqq efROPc">
                            <div className="rsc-ts-image-container sc-htoDjs vmYlS">
                                <img className="rsc-ts-image sc-gzVnrw cwuCQv" src="/static/media/BOT.88123695.png" alt="avatar" />
                            </div>
                            <div className="rsc-ts-bubble sc-bZQynM hQsUiY">
                                <Slider min={Number(options[0])} max={Number(options[options.length - 1])}
                                    defaultValue={0}
                                    value={this.state.rangeSliderValue}
                                    onChange={this.updateaSliderValue.bind(this)}
                                    handle={this.handleSlider.bind(this)} />
                                <div className="sliderMarker">
                                    <span>{options[0]}</span>
                                    <span>{options[options.length - 1]}</span>
                                </div>

                                <button onClick={() => this.handleAnswer()}>
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }

}

export default Sliders;
