import { MessageSquare } from "lucide-react";

import PageHeader from "./common/PageHeader";

function MessagesPage() {
  const conversations = [
    {
      name: "Rohit Verma",
      message: "Is the BMW available tomorrow?",
      time: "10:30 AM",
    },
    {
      name: "Neha Singh",
      message: "Where should I pick up the car?",
      time: "Yesterday",
    },
    {
      name: "Aman Gupta",
      message: "Thank you!",
      time: "Monday",
    },
  ];

  return (
    <>
      <PageHeader
        title="Messages"
        description="Communicate with your renters."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {conversations.map((conversation) => (
          <button
            key={conversation.name}
            type="button"
            className="flex w-full items-center gap-4 border-b border-slate-100 p-5 text-left transition last:border-b-0 hover:bg-slate-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {conversation.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">
                  {conversation.name}
                </p>

                <span className="shrink-0 text-xs text-slate-400">
                  {conversation.time}
                </span>
              </div>

              <p className="mt-1 truncate text-sm text-slate-500">
                {conversation.message}
              </p>
            </div>

            <MessageSquare className="h-4 w-4 shrink-0 text-slate-400" />
          </button>
        ))}
      </div>
    </>
  );
}

export default MessagesPage;
