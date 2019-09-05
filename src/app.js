import React from "react";
import ReactDOM from "react-dom";
import HanziWriter from "hanzi-writer";
import _ from "lodash";
import { characterList } from "./characters"

class HelloMessage extends React.Component {
  constructor() {
    super()
    this.resetQuiz = this.resetQuiz.bind(this)
    this.loadNewCharacter = this.loadNewCharacter.bind(this)
    this.characterList = _.cloneDeep(characterList)
    this.state = {}
    characterList.forEach(cl => {
      if(!cl.data) {
        console.log('MISSING', cl.character)
      }
    })
  }

  loadNewCharacter(index) {
    const char = characterList.splice(index, 1);
    const { character, pinyin, translation, data } = char[0];
    this.setState({
      character,
      data,
      pinyin,
      translation,
      charIndex: index
    })
  }
  componentDidMount() {
    this.loadNewCharacter(0)
  }

  componentDidUpdate() {
    const {character, data, pinyin, translation, constainerClassName = 'empty-writer'} = this.state;

    if(data) {
      this.writer = HanziWriter.create('character-writer-container', character, {
        width: 200,
        height: 200,
        showCharacter: false,
        showOutline: false,
        showHintAfterMisses: 1,
        padding: 5,
        charDataLoader: function() {
          return data;
        }
      });

      this.writer.quiz({
        onComplete: (summaryData) => {
          const gElement = document.querySelector(`#character-writer-container g`);
          gElement.parentNode.removeChild(gElement)
          this.loadNewCharacter(this.state.charIndex + 1)
        }
      });
    }
  }

  resetQuiz() {
    this.writer.quiz();
  }

  render() {
    const {pinyin, translation} = this.state;

    return (
      <div class='character-container'>
        <p className='pinyin-container'>{pinyin}</p>
        <p className='translation-container'>{translation}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" id='character-writer-container' className='character-svg'>
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
        console.log('START APP')
        ReactDOM.render(<HelloMessage name="Muthu3" />, mountNode);
    }
};

app.initialize()
