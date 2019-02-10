import React from "react";
import ReactDOM from "react-dom";
import HanziWriter from "hanzi-writer";
import ren from "hanzi-writer-data/人";

class HelloMessage extends React.Component {
  constructor() {
    super()
    this.resetQuiz = this.resetQuiz.bind(this)
  }
  componentDidMount() {
    console.log('DID MOUNT', ren)
    // var writer = HanziWriter.create('character-target-div', '我', {
    //   width: 100,
    //   height: 100,
    //   padding: 5
    // });
    this.writer = HanziWriter.create('character-target-div', '人', {
      width: 200,
      height: 200,
      showCharacter: false,
      padding: 5,
      charDataLoader: function() {
        return ren;
      }
    });

    this.writer.quiz();
  }

  resetQuiz() {
    console.log('RESET')
    this.writer.setCharacter('人')
    this.writer.quiz();
  }

  render() {
    return (
      <div>
        <div id="character-target-div"></div>
        <button onClick={this.resetQuiz}>Reset</button>
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
      console.log('BIND EVENTS')
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
      console.log('SOMETHING HAPPENING')
        var mountNode = document.getElementById("reactApp");
        ReactDOM.render(<HelloMessage name="Muthu3" />, mountNode);
    }
};

app.initialize()
