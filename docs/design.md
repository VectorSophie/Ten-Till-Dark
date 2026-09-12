# Ten Till Dark — playable first pass

## Preserved foundations
First-person anchored duel, at most ten normal exchanges; low-right revolver; distant polygonal opponent; no persistent crosshair; player-only health and visible rounds; four understated keyboard candidates. W→W Aim, W→D Quick Draw, S→S Brace, S→A Trick. The final key must be held during mouse execution and released to commit. White action guides are temporary. Opponent body animations progressively disclose action and injury, without action labels or health bars.

The default exchange lasts three seconds. Both preparations run simultaneously. Shots resolve at the actual commit time, rather than waiting for a round-end comparison. There is a three-second physical reload after exchange five. Daylight falls continuously to violet dusk. Lethal outcomes pull the camera out into third person, then automatically play the last seven seconds at half speed; the replay slider spans the whole recorded match.

## Concrete decisions in this implementation
- Practice doubles action time to six seconds; the mid-duel reload remains three seconds.
- One commitment per actor per exchange. The normal fight is single-player against rule-based Voss, not network multiplayer.
- Aim and Draw consume one of six rounds. Aim charge increases damage and accuracy. Both retain nonzero baseline hit chance.
- Execution grades combine final alignment, path adherence, smoothness/acceleration variation, stability, path completion, hold/release timing and correct input. Grades range Rough / Clean / Sharp / Perfect.
- Draw causes stronger accuracy disruption to unfinished enemy preparation. It does not automatically cancel the opponent's action.
- Brace forms after 0.22 seconds, stays effective until 1.25 seconds from preparation, and persists at most 0.32 seconds after release. Execution modifies mitigation; some damage always gets through. Successful blocks grant accuracy on the next shot.
- Trick follows a branching path, costs no ammunition, spoils accuracy and breaks a sufficiently baited brace. It does not deal direct damage. A successful bait grants a next-shot accuracy bonus.
- Q/E lean with smoothed inertia; C crouches. Lean affects incoming accuracy. Crouch slightly reduces incoming accuracy and changes body/camera height; it is not an invulnerability control.
- Voss chooses from weighted moves before the exchange using the last three player actions, then executes with variable preparation and commitment times. He obeys ammunition and the same shot/brace/trick resolution. No LLM, network request or API key is involved. Adaptation currently uses action repetition, not a full timing-habit model.
- Both cylinders are opened after exchange five. Hover the next empty chamber and press R. Missed loads remain empty. Voss visibly reloads on his own schedule.
- If both survive exchange ten, there is exactly one sudden-death Quick Draw exchange. Any hit is decisive. If both miss or fail to fire, the result is a draw, not another endless round.
- Escape, window blur and a hidden tab pause the match and cancel an unfinished player preparation. Restart resets state and chooses a new random seed.

## Art and implementation
Actual animated Three.js geometry provides the street, mesas, windmill, articulated duelists and first-person revolver. Generated artwork is the visual reference and appears in the field guide; it is not presented as animated mesh or used to fake a gameplay screenshot. WebGL provides matte Lambert surfaces, shadow maps, sky shader, changing directional/hemisphere lighting, muzzle lights and dust. A Three.js SVG software renderer provides functional fallback when WebGL is unavailable, with reduced lighting and no shadow-map fidelity.

Built-in imagegen produced `public/art/dustwater.jpg` and `public/art/gunslinger.png` (the former converted losslessly in composition from the generated PNG to an optimized JPEG). Exact prompts are in `art-prompts.md`. Imagegen was used, not the API CLI. Character reference contains an atmospheric halo; it is intentionally confined to the field guide.

## Verification and practical limits
Seven deterministic engine tests cover input commitment, empty-ammo recovery, execution scoring, brace windows, mid-duel loading, match termination and pause behavior. Browser checks exercise menu entry and actual keyboard shots, pause/resume, help and replay. The preview's WebGL context is disabled, so visual inspection uses the software fallback; GPU shadows, shader appearance and GPU frame rate cannot be certified from that preview. No claim of a measured 60 FPS or a production-quality final balance is made.

Further tuning should be based on human play: input failure rate, distribution of execution grades, action usage, median time-to-kill and how well viewers identify physical tells. The supplied reference file `00-hero-target.png` was mentioned in earlier context but was not attached here; the exact prior framing could not be compared.
