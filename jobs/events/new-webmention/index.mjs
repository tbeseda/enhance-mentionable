import arc from "@architect/functions";

export const handler = arc.events.subscribe(async (event) => {
  console.log(event);
  return;
});
