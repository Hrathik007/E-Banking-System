import React, { useState, useEffect, useCallback } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const VoiceBanking = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.userData || {});
  const { accounts } = useSelector((state) => state.userAccounts || {});

  const processCommand = useCallback((command) => {
    // Get the first account ID if user has accounts
    const accountId = accounts && accounts.length > 0 ? accounts[0]._id : null;

    // Check balance
    if (command.includes("balance") || command.includes("check balance")) {
      setResponse("Navigating to balance page...");
      setTimeout(() => navigate("/retrieve-balance"), 1500);
    }
    // Transfer money
    else if (command.includes("transfer")) {
      if (accountId) {
        setResponse("Opening transfer page...");
        setTimeout(() => navigate(`/account/transfer/${accountId}`), 1500);
      } else {
        setResponse("You don't have any accounts yet. Please create an account first.");
      }
    }
    // Deposit
    else if (command.includes("deposit")) {
      if (accountId) {
        setResponse("Opening deposit page...");
        setTimeout(() => navigate(`/account/deposit/${accountId}`), 1500);
      } else {
        setResponse("You don't have any accounts yet. Please create an account first.");
      }
    }
    // Withdraw
    else if (command.includes("withdraw")) {
      if (accountId) {
        setResponse("Opening withdrawal page...");
        setTimeout(() => navigate(`/account/withdraw/${accountId}`), 1500);
      } else {
        setResponse("You don't have any accounts yet. Please create an account first.");
      }
    }
    // Transactions
    else if (
      command.includes("transaction") ||
      command.includes("history") ||
      command.includes("transactions")
    ) {
      if (accountId) {
        setResponse("Showing your transactions...");
        setTimeout(() => navigate(`/account/in/${accountId}`), 1500);
      } else {
        setResponse("You don't have any accounts yet. Please create an account first.");
      }
    }
    // Profile
    else if (command.includes("profile")) {
      if (info && info.id) {
        setResponse("Opening your profile...");
        setTimeout(() => navigate(`/profile/${info.id}`), 1500);
      } else {
        setResponse("Unable to access profile. Please try again.");
      }
    }
    // Help
    else if (command.includes("help")) {
      setResponse(
        "You can say: 'Check balance', 'Transfer money', 'Deposit', 'Withdraw', 'Show transactions', or 'Open profile'"
      );
    } else {
      setResponse(
        "I didn't understand that. Say 'help' to see available commands."
      );
    }
  }, [accounts, navigate, info]);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);
        processCommand(speechResult);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setResponse("Sorry, I couldn't understand that. Please try again.");
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [processCommand]);

  const toggleListening = () => {
    if (!recognition) {
      setResponse("Voice recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setResponse("");
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="max-w-5xl w-full">
      <h3 className="flex justify-center items-center text-xl sm:text-2xl text-center font-bold px-2 py-4 mb-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-b-4 border-blue-800 rounded shadow">
        <FaMicrophone className="mr-2" size={40} />
        Voice Banking Assistant
      </h3>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            Tap the microphone and speak your command
          </p>
          <button
            onClick={toggleListening}
            className={`p-8 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isListening ? (
              <FaMicrophone className="text-white" size={60} />
            ) : (
              <FaMicrophoneSlash className="text-white" size={60} />
            )}
          </button>
          <p className="mt-4 text-sm font-semibold text-gray-700">
            {isListening ? "Listening..." : "Click to speak"}
          </p>
        </div>

        {transcript && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
            <p className="text-sm text-gray-600">You said:</p>
            <p className="text-lg font-semibold text-blue-800">{transcript}</p>
          </div>
        )}

        {response && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Assistant:</p>
            <p className="text-lg font-semibold text-green-800">{response}</p>
          </div>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-4 text-gray-800">
            Available Commands:
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Check balance" or "Show my balance"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Transfer money" or "Transfer"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Deposit money" or "Deposit"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Withdraw money" or "Withdraw"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Show transactions" or "Transaction history"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Open profile" or "My profile"
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              "Help" - Shows available commands
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
