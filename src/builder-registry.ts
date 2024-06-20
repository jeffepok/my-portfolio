"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import ListCard from "./components/ui/cards/listCard";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(ListCard, {
  name: "ListCard",
  inputs: [
    {
      name: "infos",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "ListInfo[]",
      },
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});
