import React from "react";
import ReactDOM from "react-dom";
import ChatBot from 'react-simple-chatbot';
import Review from './Review'
import Sliders from './slider'
import "./styles.css";
import bot from './BOT.png'
import json from './question.json'
function App() {

  console.log(json)
  const data = [
    {
      id: "13",
      component: (
        <Sliders />
      )
    }
  ];
  function reviewValue(value) {

  }
  function getOptionAnswer(option, trigger) {
    let options = []
    let item = option.split(",")
    item.map(function (res, j) {
      options.push({
        value: res,
        label: res,
        trigger: trigger
      })
    })
    return options;
  }


  function fethQuestionUserAction(question, list, nextLevel, option, index) {

    let element = {}
    let userAction = {}
    element.id = list.question_id
    element.message = list.question

    if (nextLevel && option) {

      element.trigger = list.question_id.toString() + '-answer'
      const options = getOptionAnswer(list.options, question[index + 1].question_id)
      userAction = {
        id: list.question_id.toString() + '-answer',
        options,
      }
      return { element, userAction }

    } else if (!nextLevel && option) {

      element.trigger = list.question_id.toString() + '-answer'
      const options = getOptionAnswer(list.options, false)
      userAction = {
        id: list.question_id.toString() + '-answer',
        options,
      }
      
      return { element, userAction }

    } else if (nextLevel && !option) {

      element.id = list.question_id
      element.message = list.question
      element.trigger = question[index + 1].question_id

      return element

    } else {
      element.end = true
      return element
    }


    console.log(list)
    /*let element = {}
    let userAction = {}
    element.id = list.question_id
    element.message = list.question
    if ((json[i + 1] === undefined) && list.options !== undefined) {
      // next leavel and checking where user action is there or not 
      // Scenario when question doesn't have next level of 
      //question and has action 

      if (list.question_type === "MULTI" || list.question_type === "YESNO") {
        element.trigger = list.question_id.toString() + '-answer'
        const options = getOptionAnswer(list.options, false)
        userAction = {
          id: list.question_id.toString() + '-answer',
          options,
        }

      } else if (list.question_type === "RangeNumber" ||
        list.question_type === "RangePercentage") {
        element.trigger = list.question_id.toString() + '-answer'
        userAction = {
          id: list.question_id.toString() + '-answer',
          waitAction: true,
          component: (
            <Sliders nextStepIs={list.question_id.toString() + '-answer'} getValueformSlider={reviewValue} options={list.options} />
          )

        }
      }


      // Scerio for sub question 
      if (list.subQuestion && list.subQuestion.length >= 1) {
        formatReadinessQuetions(list.subQuestion, list)
      }


    } else if ((json[i + 1] !== undefined) && list.options !== undefined) {

    // Scenatio when question doesn have next level of 
      //  question and has user action 

      if (list.question_type === "MULTI" || list.question_type === "YESNO") {
        element.trigger = list.question_id.toString() + '-answer'
        const options = getOptionAnswer(list.options, json[i + 1].question_id)
        userAction = {
          id: list.question_id.toString() + '-answer',
          options,
        }
      } else if (list.question_type === "RangeNumber" || list.question_type === "RangePercentage") {
        element.trigger = list.question_id.toString() + '-answer'
        userAction = {
          id: list.question_id.toString() + '-answer',
          waitAction: true,
          component: (
            <Sliders
              nextStepIs={json[i + 1].question_id}
              getValueformSlider={reviewValue}
              options={list.options} />
          )

        }
      }

      // Scerio for sub question 
      if (list.subQuestion && list.subQuestion.length >= 1) {
        console.log(`this has level question${i}`)
        debugger
        formatReadinessQuetions(list.subQuestion, list)

      }

    } else if ((json[i + 1] !== undefined) && list.options === undefined) {
      // Scenario when reapeated question without user action
      element.id = list.question_id
      element.message = list.question
      element.trigger = json[i + 1].question_id

    } else {

      element.end = true

    }

    // if (Object.keys(userAction).length !== 0) {
    //   questionList.push(element, userAction)
    // } else {
    //   questionList.push(element)
    // }
    //questionList.push(element)*/
  }



  function formatReadinessQuetions(json, parentQuestion) {
    //debugger;
    let questionList = []

    json.map(function (list, i) {

      if (parentQuestion !== '') {
        fethQuestionUserAction(list)
      } else {
        const nextLevel = json[i + 1] === undefined ? false : true
        const option = list.options === undefined ? false : true
        const qList = fethQuestionUserAction(json, list, nextLevel, option, i)
        /*if(list.hasOwnProperty("subQuestion")){
          console.log("has subquestion")
          formatReadinessQuetions
        }*/

        
        if (qList.hasOwnProperty("userAction")) {
          questionList.push(qList.element)
          questionList.push(qList.userAction)
        } else {
          questionList.push(qList)
        }


      }
    })

    return questionList
  }





  let formattedList = formatReadinessQuetions(json, '')
  console.log(formattedList)
  //console.log(data)
  return (
    <div className="App">
      <ChatBot
        botDelay={1500}
        botAvatar={bot}
        steps={formattedList}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
