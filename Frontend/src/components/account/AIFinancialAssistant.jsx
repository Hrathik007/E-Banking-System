import React, { useState } from "react";
import { FaRobot, FaPaperPlane, FaChartLine } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const AIFinancialAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Financial Assistant. I can help you analyze your spending, create budgets, and provide financial insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { account } = useSelector((state) => state.userAccount);

  // Mock data for demonstration
  const spendingData = [
    { month: "Jan", amount: 4500 },
    { month: "Feb", amount: 5200 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 6100 },
    { month: "May", amount: 5500 },
    { month: "Jun", amount: 6800 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 3500, color: "#FF6384" },
    { name: "Transport", value: 1200, color: "#36A2EB" },
    { name: "Shopping", value: 2800, color: "#FFCE56" },
    { name: "Bills & Utilities", value: 1500, color: "#4BC0C0" },
    { name: "Entertainment", value: 800, color: "#9966FF" },
  ];

  const generateResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Spending insights
    if (msg.includes("spending") || msg.includes("spend")) {
      return {
        text: "Based on your recent transactions, you're spending an average of ₹5,483 per month. Your spending has increased by 15% compared to last quarter. I recommend setting a monthly budget of ₹6,000 to keep your finances on track.",
        showChart: "spending",
      };
    }

    // Budget advice
    if (msg.includes("budget") || msg.includes("save")) {
      return {
        text: "Here's a recommended budget breakdown for you:\n\n• Food & Dining: ₹3,000 (30%)\n• Transport: ₹1,000 (10%)\n• Bills: ₹2,000 (20%)\n• Savings: ₹2,500 (25%)\n• Miscellaneous: ₹1,500 (15%)\n\nTry to save at least 25% of your monthly income. You're currently at 18%, so there's room for improvement!",
        showChart: "category",
      };
    }

    // Categories
    if (msg.includes("category") || msg.includes("categories")) {
      return {
        text: "Your spending is distributed across these categories. Food & Dining takes the largest portion at 35%. Consider meal planning to reduce this expense by 10-15%.",
        showChart: "category",
      };
    }

    // Balance inquiry
    if (msg.includes("balance") || msg.includes("account")) {
      const totalBalance = accounts?.reduce(
        (sum, acc) => sum + (acc.balance || 0),
        0
      );
      return {
        text: `You currently have ${accounts?.length || 0} account(s) with a total balance of ₹${totalBalance?.toLocaleString() || 0}. Your largest account has ₹${Math.max(...(accounts?.map((a) => a.balance) || [0]))?.toLocaleString()}.`,
        showChart: null,
      };
    }

    // Investment advice
    if (msg.includes("invest") || msg.includes("investment")) {
      return {
        text: "Based on your savings pattern, I recommend:\n\n1. Emergency Fund: Save 6 months of expenses (₹40,000)\n2. Fixed Deposits: ₹20,000 at 7% interest\n3. Mutual Funds: ₹15,000 monthly SIP\n4. Keep ₹10,000 liquid for opportunities\n\nStart with building your emergency fund first!",
        showChart: null,
      };
    }

    // Tips
    if (msg.includes("tip") || msg.includes("advice")) {
      const tips = [
        "Track every expense, no matter how small. Small purchases add up quickly!",
        "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "Automate your savings - transfer to savings account on payday.",
        "Review subscriptions monthly and cancel unused ones.",
        "Set specific financial goals with deadlines to stay motivated.",
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      return {
        text: `💡 Financial Tip: ${randomTip}`,
        showChart: null,
      };
    }

    // Default response
    return {
      text: "I can help you with:\n\n• Analyzing your spending patterns\n• Creating a budget plan\n• Providing savings advice\n• Investment recommendations\n• Financial tips\n• Account balance overview\n\nJust ask me anything about your finances!",
      showChart: null,
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.text, chart: response.showChart },
      ]);
      setLoading(false);
    }, 1000);
  };

  const renderChart = (chartType) => {
    if (chartType === "spending") {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "category") {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="max-w-5xl w-full h-screen flex flex-col">
      <h3 className="flex justify-center items-center text-xl sm:text-2xl text-center font-bold px-2 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-b-4 border-purple-800 rounded-t shadow">
        <FaRobot className="mr-2" size={40} />
        AI Financial Assistant
      </h3>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white shadow-md"
              }`}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
              {msg.chart && (
                <div className="mt-4 bg-white rounded p-4">
                  {renderChart(msg.chart)}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about your finances..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane />
          Send
        </button>
      </div>
    </div>
  );
};
