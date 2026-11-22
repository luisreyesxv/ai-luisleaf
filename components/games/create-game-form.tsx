"use client";

import { useActionState, useState } from "react";

import { DrawnFormActions } from "@/components/drawably/drawn-form-actions";
import { DrawnFormField } from "@/components/drawably/drawn-form-field";
import { DrawnFormMessage } from "@/components/drawably/drawn-form-message";
import { DrawnFormSection } from "@/components/drawably/drawn-form-section";
import { DrawnOptionGroup } from "@/components/drawably/drawn-option-group";
import { DrawnCard } from "../drawably/drawn-card";
import { DrawnRadio } from "@/components/drawably/drawn-radio";
import { DrawnSelect } from "@/components/drawably/drawn-select";
import { CreateGameSubmit } from "@/components/games/create-game-submit";
import { Card } from "@/components/ui/card";
import { createGameAction } from "@/app/actions/games";
import { initialCreateGameState } from "@/lib/games/types";
import { DrawnSelectableCard } from "@/components/drawably/drawn-selectable-card";

export function CreateGameForm() {
  const [creationRequestId] = useState(() => crypto.randomUUID());
  const [mode, setMode] = useState("six_v_six");

  const [state, formAction] = useActionState(
    createGameAction,
    initialCreateGameState,
  );

  return (
    <form action={formAction} className="max-w-5xl space-y-6">
      <input type="hidden" name="creationRequestId" value={creationRequestId} />

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* Game mode card */}
        <Card variant="sticky" className="h-full">
          <DrawnFormSection
            title="Choose your game"
            description="Pick the format everyone will play."
            divider={false}
          >
            <DrawnOptionGroup label="Game mode" required>
              <div className="space-y-3">
                <DrawnSelectableCard
                  name="mode"
                  value="six_v_six"
                  checked={mode === "six_v_six"}
                  onSelect={setMode}
                  selectedStroke="var(--primary)"
                  selectedFill="var(--primary)"
                  className="bg-white"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Six of a kind</p>
                    <p className="text-sm leading-5 text-muted">
                      The classic team-based format. Players take turns
                      describing, acting out, and drawing words.
                    </p>
                  </div>
                </DrawnSelectableCard>

                <DrawnSelectableCard
                  name="mode"
                  value="hot_seat"
                  checked={mode === "hot_seat"}
                  onSelect={setMode}
                  selectedStroke="var(--primary)"
                  selectedFill="var(--primary)"
                  className="bg-white"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Hot Seat</p>
                    <p className="text-sm leading-5 text-muted">
                      A fast-paced format where one player takes the spotlight.
                    </p>
                  </div>
                </DrawnSelectableCard>
              </div>
            </DrawnOptionGroup>
          </DrawnFormSection>
        </Card>

        {/* Game settings card */}
        <Card variant="sticky" className="h-full">
          <DrawnFormSection
            title="Game settings"
            description="Fine-tune how each round plays."
            divider={false}
          >
            <div className="space-y-6">
              <DrawnFormField
                label="Turn duration"
                htmlFor="turnDurationSeconds"
                description="How long each turn lasts."
              >
                <DrawnSelect
                  id="turnDurationSeconds"
                  name="turnDurationSeconds"
                  defaultValue="60"
                  required
                  className="w-full p-2 bg-white rounded-2xl [--drawably-stroke:currentColor] focus:[--drawably-stroke:var(--primary)]"
                >
                  <option value="30">30 seconds</option>
                  <option value="45">45 seconds</option>
                  <option value="60">60 seconds</option>
                  <option value="75">75 seconds</option>
                  <option value="90">90 seconds</option>
                  <option value="105">105 seconds</option>
                  <option value="120">120 seconds</option>
                </DrawnSelect>
              </DrawnFormField>

              <DrawnFormField
                label="Words per player"
                htmlFor="wordsPerPlayer"
                description="How many words each player contributes."
              >
                <DrawnSelect
                  id="wordsPerPlayer"
                  name="wordsPerPlayer"
                  stroke="black"
                  defaultValue="3"
                  required
                  className="w-full p-2 bg-white rounded-2xl [--drawably-stroke:currentColor] focus:[--drawably-stroke:var(--primary)]"
                >
                  <option value="1">1 word</option>
                  <option value="2">2 words</option>
                  <option value="3">3 words</option>
                  <option value="4">4 words</option>
                </DrawnSelect>
              </DrawnFormField>
            </div>
          </DrawnFormSection>
        </Card>
      </div>

      {state.status === "error" && (
        <DrawnFormMessage
          stroke="var(--danger)"
          fill="var(--danger)"
          tone="error"
        >
          {state.message}
        </DrawnFormMessage>
      )}

      <DrawnFormActions alignment="start">
        <CreateGameSubmit hasError={state.status === "error"} />{" "}
      </DrawnFormActions>
    </form>
  );
}
