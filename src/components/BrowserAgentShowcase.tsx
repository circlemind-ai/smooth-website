"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Play, Pause, Smartphone, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  task: string
  cost: string
  duration: string
  videoUrl: string
}

const mobileTasks: Task[] = [
  {
    id: "m1",
    title: "Scrape behind login",
    task: "Find our latest invoice from Calendly",
    cost: "$0.03",
    duration: "27s",
    videoUrl: "videos/calendly.mp4",
  },
  {
    id: "m2",
    title: "Social media automation",
    task: "Automate any action on any social media",
    cost: "$0.04",
    duration: "56s",
    videoUrl: "/videos/linkedin.mov",
  },
  {
    id: "m3",
    title: "Dynamic multi-step forms",
    task: "Automatically get a quote from Octopus energy",
    cost: "$0.02",
    duration: "37s",
    videoUrl: "/videos/octopus.mp4",
  },
  {
    id: "m4",
    title: "QA testing",
    task: "Test the iPhone page on apple.com",
    cost: "$0.02",
    duration: "45s",
    videoUrl: "/videos/apple.mp4",
  },
]

const desktopTasks: Task[] = [
  {
    id: "d1",
    title: "Lead capture",
    task: "Find all speakers from the London AI Summit website",
    cost: "$0.04",
    duration: "1m 41s",
    videoUrl: "/videos/summit.mp4",
  },
  {
    id: "d2",
    title: "Real-time people enrichment",
    task: "Find the latest Linkedin article from Bill Gates",
    cost: "$0.02",
    duration: "33s",
    videoUrl: "/videos/bill_gates.mp4",
  },
  {
    id: "d3",
    title: "Government portals",
    task: "Extract data from government portals like SEC filings",
    cost: "$0.03",
    duration: "1m 6s",
    videoUrl: "videos/gov.mp4",
  },
  {
    id: "d4",
    title: "Flight search",
    task: "Search flights from New York to London",
    cost: "$0.04",
    duration: "54s",
    videoUrl: "/videos/flights.mp4",
  },
]

export function BrowserAgentShowcase() {
  const [taskType, setTaskType] = useState<"mobile" | "desktop">("mobile")
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(2)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout>(null)

  const currentTasks = taskType === "mobile" ? mobileTasks : desktopTasks
  const currentTask = currentTasks[currentTaskIndex]

  // Convert duration string to seconds for progress calculation
  const getDurationInSeconds = (duration: string) => {
    const [minutes, seconds] = duration.includes("m") ? duration.split("m ") : ["0", duration];
    return Number.parseInt(minutes) * 60 + Number.parseInt(seconds.replace("s", ""))
  }

  useEffect(() => {
    setCurrentTaskIndex(0)
    setProgress(0)
  }, [taskType])

  // Start progress simulation
  useEffect(() => {
    if (isPlaying) {
      const totalDuration = getDurationInSeconds(currentTask.duration)
      const adjustedDuration = (totalDuration / playbackSpeed) * 1000 // Convert to milliseconds
      const intervalTime = 50 // Update every 50ms for smooth animation
      const incrementPerUpdate = 100 / (adjustedDuration / intervalTime) // Calculate increment per update

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next task
            setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % currentTasks.length)
            return 0
          }
          return prev + incrementPerUpdate
        })
      }, intervalTime)
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentTaskIndex, playbackSpeed, isPlaying, currentTask.duration, currentTasks.length])

  // Reset progress when task changes
  useEffect(() => {
    setProgress(0)
  }, [currentTaskIndex])

  const handleTaskClick = (index: number) => {
    setCurrentTaskIndex(index)
    setProgress(0)
  }

  const togglePlaybackSpeed = () => {
    setPlaybackSpeed((prev) => (prev === 2 ? 1 : 2))
  }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <div className="w-fit mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div>
            <div className="bg-gray-100/80 backdrop-blur-sm rounded-full p-1 flex items-center w-fit mx-auto">
              <button
              onClick={() => setTaskType("mobile")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                taskType === "mobile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </button>
            <button
              onClick={() => setTaskType("desktop")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                taskType === "desktop" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-full items-center">
          {/* Task List */}
          <div className="w-full lg:w-[500px] min-w-0 rounded-xl">
            <div className="space-y-0">
              {currentTasks.map((task, index) => (
                <div key={task.id}>
                  <button
                    onClick={() => handleTaskClick(index)}
                    className={cn(
                      "w-full text-left p-4 transition-all duration-200 bg-gray-200/20 cursor-pointer hover:bg-gray-200/50 overflow-hidden relative",
                      currentTaskIndex === index && "bg-gray-200/50",
                      index === 0 && "rounded-t-xl",
                      index === currentTasks.length - 1 && "rounded-b-xl",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                        <h4 className="font-regular text-gray-900">{task.task}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">
                            {task.cost} • {task.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar for current task */}
                    {currentTaskIndex === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
                        <div
                          className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>

                  {/* Separator line */}
                  {index < currentTasks.length - 1 && <div className="h-px bg-gray-200" />}
                </div>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:max-w-1/2 w-fit flex shrink-1 max-h-full min-h-64 min-w-64">
            <div className="relative mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Video container now fills available height */}
              <div
                className="relative m-[-2px]"
                // style={{
                //   width: "min(390px, 100vw - 3rem)",
                // }}
              >
                <div className="relative">
                  <video
                    src={taskType == "mobile" ? "videos/calendly.mp4" : "videos/summit.mp4"}
                    className="w-full h-full lg:max-h-[500px] invisible opacity-0"
                    muted
                    playsInline
                  />
                  <video
                    ref={videoRef}
                    src={currentTask.videoUrl}
                    className="w-full h-full lg:max-h-[500px] absolute inset-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Video controls overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {/* Playback speed toggle */}
                  <button
                    onClick={togglePlaybackSpeed}
                    className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-black/70 transition-colors cursor-pointer"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlayPause}
                    className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue/20">
                  <div
                    className="h-full bg-blue-200 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(BrowserAgentShowcase);