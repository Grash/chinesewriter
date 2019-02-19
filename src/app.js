import React from "react";
import ReactDOM from "react-dom";
import HanziWriter from "hanzi-writer";
import ren from "hanzi-writer-data/人";
import { characterList } from "./characters"

class HelloMessage extends React.Component {
  constructor() {
    super()
    this.resetQuiz = this.resetQuiz.bind(this)
    this.state = {}
  }

  loadJSON(character, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', `res/charData/${character}.json`, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
  }

  loadNewCharacter(index) {
    const { character, constainerClassName, pinyin, translation } = characterList[index]
    this.loadJSON(character, (response) => {
        var charJSON = JSON.parse(response);
        console.log('RESPONSE', charJSON, constainerClassName)
        this.setState({
          character,
          data: charJSON,
          pinyin,
          translation,
          constainerClassName
        })
     });
  }
  componentDidMount() {
    this.loadNewCharacter(0)
  }

  componentDidUpdate() {
    const {character, data, pinyin, translation, constainerClassName = 'empty-writer'} = this.state;

    if(data) {
      this.writer = HanziWriter.create(constainerClassName, character, {
        width: 200,
        height: 200,
        showCharacter: false,
        padding: 5,
        charDataLoader: function() {
          return data;
        }
      });

      this.writer.quiz({
        onComplete: (summaryData) => {
          console.log('COMPLETE')
          document.querySelector(`#${constainerClassName}`).innerHTML = '';
          this.loadNewCharacter(1)
        }
      });
    }
  }

  resetQuiz() {
    this.writer.quiz();
  }

  render() {
    const {character, data, pinyin, translation, constainerClassName = 'empty-writer'} = this.state;

    return (
      <div class='character-container'>
        <p className='pinyin-container'>{pinyin}</p>
        <p className='translation-container'>{translation}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" id={constainerClassName} className='character-svg'>
          <line x1="0" y1="0" x2="200" y2="200" stroke="#DDD" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="#DDD" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#DDD" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="#DDD" />
        </svg>
        <button onClick={this.resetQuiz} class='reset-button'>Reset</button>
      </div>
    );
  }
}
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var mountNode = document.getElementById("reactApp");
        ReactDOM.render(<HelloMessage name="Muthu3" />, mountNode);
    }
};

app.initialize()
