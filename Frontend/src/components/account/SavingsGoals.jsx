import React, { useState } from "react";
import { FaUsers, FaPlus, FaTrophy, FaHeart } from "react-icons/fa";

export const SavingsGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Family Vacation 2026",
      target: 50000,
      current: 32500,
      contributors: ["You", "Spouse", "Parents"],
      category: "Travel",
      deadline: "2026-06-15",
    },
    {
      id: 2,
      name: "Emergency Fund",
      target: 100000,
      current: 75000,
      contributors: ["You"],
      category: "Savings",
      deadline: "2025-12-31",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    category: "Savings",
    deadline: "",
  });

  const createGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      alert("Please fill all fields");
      return;
    }

    const goal = {
      id: goals.length + 1,
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      contributors: ["You"],
      category: newGoal.category,
      deadline: newGoal.deadline,
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: "", target: "", category: "Savings", deadline: "" });
    setShowCreateModal(false);
  };

  const contribute = (goalId) => {
    const amount = prompt("Enter contribution amount:");
    if (amount && !isNaN(amount)) {
      setGoals(
        goals.map((g) =>
          g.id === goalId
            ? { ...g, current: g.current + parseFloat(amount) }
            : g
        )
      );
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="max-w-6xl w-full">
      <h3 className="flex justify-center items-center text-xl sm:text-2xl text-center font-bold px-2 py-4 mb-10 bg-gradient-to-r from-green-500 to-teal-600 text-white border-b-4 border-green-800 rounded shadow">
        <FaUsers className="mr-2" size={40} />
        Collaborative Savings Goals
      </h3>

      <div className="mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition-all"
        >
          <FaPlus /> Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = percentage >= 100;

          return (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {goal.name}
                    {isCompleted && <FaTrophy className="text-yellow-500" />}
                  </h4>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {goal.category}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold">
                    ₹{goal.current.toLocaleString()} / ₹
                    {goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(percentage)} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm mt-1 font-semibold text-gray-700">
                  {percentage.toFixed(1)}%
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Contributors:</p>
                <div className="flex flex-wrap gap-2">
                  {goal.contributors.map((contributor, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <FaHeart className="text-red-500" size={10} />
                      {contributor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </span>
                {!isCompleted && (
                  <button
                    onClick={() => contribute(goal.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Contribute
                  </button>
                )}
                {isCompleted && (
                  <span className="text-green-600 font-bold flex items-center gap-2">
                    <FaTrophy /> Goal Achieved!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Create New Savings Goal
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                  placeholder="e.g., Family Vacation"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                  placeholder="50000"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option>Savings</option>
                  <option>Travel</option>
                  <option>Education</option>
                  <option>Emergency</option>
                  <option>Investment</option>
                  <option>Gift</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={createGoal}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
