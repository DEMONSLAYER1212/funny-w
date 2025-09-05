"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function KothiGudhaGame() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [showShake, setShowShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [acceptedBot, setAcceptedBot] = useState(false);
  const [blurLevel, setBlurLevel] = useState(20);
  const [gameRevealed, setGameRevealed] = useState(false);

  const targetName = "kothigudha";
  const displayName = "KOTHI GUDHA";
  const maxAttempts = 6;

  useEffect(() => {
    setRevealedLetters(new Array(targetName.length).fill(false));
    setBlurLevel(20);
  }, []);

  const handleGuess = () => {
    if (currentGuess.toLowerCase().trim() === displayName.toLowerCase()) {
      setGameRevealed(true);
      setShowConfetti(true);
      setBlurLevel(0);
    } else {
      const lowerGuess = currentGuess.toLowerCase().trim();
      if (lowerGuess.includes("banana") || lowerGuess === "banana") {
        alert("🍌 Close, but I eat those. Try harder!");
      }

      setAttempts((prev) => prev + 1);
      revealRandomLetter();
      setBlurLevel((prev) => Math.max(10, prev - 1.67));
      triggerShake();
    }
    setCurrentGuess("");
  };

  const revealRandomLetter = () => {
    setRevealedLetters((prev) => {
      const newRevealed = [...prev];
      const hiddenIndices = newRevealed
        .map((revealed, index) => (!revealed ? index : -1))
        .filter((i) => i !== -1);

      if (hiddenIndices.length > 0) {
        const randomIndex =
          hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
        newRevealed[randomIndex] = true;
      }
      return newRevealed;
    });
  };

  const triggerShake = () => {
    setShowShake(true);
    setTimeout(() => setShowShake(false), 500);
  };

  const handleAcceptBot = () => {
    setAcceptedBot(true);
    setGameRevealed(true);
    setShowConfetti(true);
    setBlurLevel(0);
  };

  const getHintText = () => {
    const revealedCount = revealedLetters.filter(Boolean).length;
    if (revealedCount === 0)
      return "🐒 The monkey knows your name! Can you guess it?";
    if (revealedCount <= 3)
      return "🔍 The image is getting clearer! Keep trying!";
    if (revealedCount <= 6)
      return "🔥 So close! The monkey is almost revealed!";
    return "🤖 Maybe you should accept you're a bot and let the monkey help you?";
  };

  const renderRevealedName = () => {
    return displayName.split("").map((letter, index) => {
      if (letter === " ") {
        return <span key={index} className="mx-2"></span>;
      }

      const targetIndex = index < 5 ? index : index - 1; // Account for space
      const isRevealed = revealedLetters[targetIndex];

      return (
        <span
          key={index}
          className={`inline-block mx-1 text-4xl font-bold transition-all duration-500 ${
            isRevealed ? "text-orange-600" : "text-muted-foreground"
          }`}
        >
          {isRevealed ? letter : "_"}
        </span>
      );
    });
  };

  if (gameRevealed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["#ea580c", "#f97316", "#d97706", "#fffbeb"][
                    Math.floor(Math.random() * 4)
                  ],
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        <Card className="w-full max-w-2xl bounce-in border-orange-200">
          <CardHeader className="text-center">
            <div className="mb-6 flex justify-center relative">
              <img
                src="https://img.freepik.com/free-photo/view-funny-monkey-celebrating-birthday_23-2150758386.jpg"
                alt="Kothi Gudha - The Monkey King"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
                style={{ filter: "blur(0px)" }}
              />
              <div className="absolute -top-2 -right-2 text-6xl animate-bounce">
                👑
              </div>
              <div className="absolute -bottom-2 -left-2 text-4xl animate-pulse">
                😎
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-orange-600">
              Congrats and Happy Birthday Kothi Gudha!
            </CardTitle>
            <CardDescription className="text-xl text-orange-700">
              You're officially the Monkey King!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-orange-600 animate-pulse">
              KOTHI GUDHA
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-lg border-2 border-orange-300">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                🐒 Monkey King Facts!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-lg font-semibold text-orange-600">
                    🏡 Kothi Status:
                  </div>
                  <div className="text-orange-700">
                    Royal Monkey Palace Owner
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-lg font-semibold text-orange-600">
                    🧠 Gudha Level:
                  </div>
                  <div className="text-orange-700">Supreme Monkey Wisdom</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-lg font-semibold text-orange-600">
                    🍌 Banana Skills:
                  </div>
                  <div className="text-orange-700">
                    {acceptedBot
                      ? "Bot-level banana peeling"
                      : "Expert banana connoisseur"}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="text-lg font-semibold text-orange-600">
                    👑 Special Power:
                  </div>
                  <div className="text-orange-700">
                    Making everyone go bananas with laughter!
                  </div>
                </div>
              </div>
            </div>

            <div className="text-lg text-orange-700 bg-orange-50 p-4 rounded-lg">
              {acceptedBot
                ? "🤖🐒 Even bots can be monkey kings! Thanks for being honest - now go eat some bananas! 🍌😄"
                : "🎊🐒 You solved the monkey mystery! You're officially the funniest monkey in the jungle! 🎊🍌"}
            </div>

            <button
              onClick={() => {
                setCurrentGuess("");
                setAttempts(0);
                setAcceptedBot(false);
                setShowConfetti(false);
                setBlurLevel(20);
                setGameRevealed(false);
                setRevealedLetters(new Array(targetName.length).fill(false));
              }}
              className="text-lg px-8 py-3 rounded-md font-medium text-white transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: "#f97316" }}
            >
              🔄 Play Again (Go Bananas!)
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://img.freepik.com/free-photo/view-funny-monkey-celebrating-birthday_23-2150758386.jpg"
          alt="Background Monkey"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{ filter: `blur(${blurLevel + 10}px)` }}
        />
      </div>

      <Card
        className={`w-full max-w-lg ${
          showShake ? "shake" : ""
        } border-orange-200 relative z-10`}
      >
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/view-funny-monkey-celebrating-birthday_23-2150758386.jpg"
              alt="Mystery Monkey"
              className="w-40 h-40 rounded-full object-cover transition-all duration-1000"
              style={{ filter: `blur(${blurLevel}px)` }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-orange-600">
            🕵️ Guess Your Real Name!
          </CardTitle>
          <CardDescription className="text-orange-700">
            {getHintText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-dashed border-orange-300">
            <div className="text-sm text-orange-600 mb-2">
              The monkey says your real name is:
            </div>
            <div className="font-mono text-center">{renderRevealedName()}</div>
          </div>

          <div className="flex justify-center gap-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              Attempts: {attempts}/{maxAttempts}
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-300 text-orange-700"
            >
              Letters revealed: {revealedLetters.filter(Boolean).length}/
              {targetName.length}
            </Badge>
          </div>

          {attempts < maxAttempts ? (
            <div className="space-y-3">
              <input
                type="text"
                autoFocus
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value)}
                placeholder="Enter your guess..."
                className="w-full px-3 py-2 text-center text-lg border border-orange-200 rounded-md focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                onKeyPress={(e) => e.key === "Enter" && handleGuess()}
              />
              <button
                onClick={handleGuess}
                disabled={!currentGuess.trim()}
                className="w-full py-3 px-4 rounded-md font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#f97316" }}
              >
                🎯 Submit Guess
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium text-orange-700">
                The monkey thinks you might be a bot!
              </p>
              <p className="text-sm text-orange-600">
                Accept your bot nature to see what the monkey has for you!
              </p>
              <button
                onClick={handleAcceptBot}
                className="py-3 px-4 rounded-md font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#ef4444" }}
              >
                I give up I'm bot gudha → Open the card
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
