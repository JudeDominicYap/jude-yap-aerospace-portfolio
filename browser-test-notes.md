# Browser Verification Notes

- Live preview loaded successfully at the project preview URL.
- Document title is `Jude Dominic Yap — Future Aeronautical Engineer`.
- The page exposes the full navigation, aircraft hotspot buttons, interest tabs, contribution expanders, project cards, contact fields, and CTA buttons.
- Clicking the aircraft `WING` hotspot updates the readout from `Fuselage` to `Wing` and changes the educational description accordingly.
- No browser-visible rendering error appeared during the first two interaction checks.

## Next checks
- Verify the engineering-interest tab changes content.
- Verify a contribution card expands and collapses.
- Verify a project card opens and closes its modal.
- Verify contact form validation and success state.
- Verify mobile navigation and responsive layout.

- The interest section is visible in the live viewport and the selected row has the intended blue active state, with the detail panel and orbital graphic rendering correctly.
- A direct click attempt on the `Aircraft Design` row did not change the selection in the captured state, so the component should be validated further with a keyboard/DOM event if needed; the underlying button is present and keyboard reachable.

- A delayed browser-state verification confirmed that selecting `Aircraft Design` changes the detail title, clicking a contribution `Learn More` control expands exactly one card, and clicking a project card opens the `Small-Scale Hydroelectric Charging Station` modal.

- Empty contact-form submission correctly surfaced the validation message `Please complete your name, email, and message.` and closed the project modal.
- Valid sample values were accepted into all three form fields; the viewport showed the learning-log cards and contact form without visible layout breakage at the captured width.

## Portfolio Update Verification

The updated live page now exposes the Automated Facial Recognition System as project 01 with a clearly labeled visual representation that says it is not live recognition. The certificate section exposes four verified certificate cards plus a fifth open slot for AI Career Readiness Training. A controlled interaction check opened the Claude Projects Artifacts certificate lightbox, closed it, opened the facial-recognition project modal, and confirmed the requested How It Works content is visible.

## Contact Link Verification

The live DOM exposes three anchor elements in the contact section. The email href is `mailto:judedominicyap@gmail.com`. GitHub uses `https://github.com/JudeDominicYap` with `target="_blank"` and `rel="noopener noreferrer"`. LinkedIn uses `https://linkedin.com/in/judedominicyap` with `target="_blank"` and `rel="noopener noreferrer"`.

## Web3Forms Form Verification

The live form was verified without sending a real external message. Empty submission shows `Please complete your name, email, and message.` A controlled successful Web3Forms response displays `Message sent successfully. Thank you — I’ll get back to you soon.` The submit control returns to `Send Message` after the request completes.

## Interactive Exploration Verification

The live page renders `PORTFOLIO EXPLORATION 1/9`. Controlled interaction checks successfully unlocked the technical marker with `System Detail Unlocked` and the accurate fact `Lift acts perpendicular to the relative airflow.`, expanded the first skill note, and expanded the first timeline field note. The initial synthetic mouseenter check did not change the aircraft readout, so a direct rendered hotspot click check remains to be completed.

The direct wing hotspot activation updates the rendered readout after React state propagation to `/ 01 Wing — Generates lift and shapes how an aircraft responds to the air around it.` The hotspot receives its selected state correctly.

## Case Study Verification

The Automated Facial Recognition System modal opens successfully. Its System pipeline tab renders the exact five stages: IMAGE INPUT, FACE DETECTION, IMAGE PROCESSING, FEATURE COMPARISON, and RECOGNITION RESULT. The modal shows the safe disclaimer that the portfolio does not perform facial recognition, and the pipeline note explicitly states that no live camera, recognition model, dataset, accuracy figure, or performance result is connected.

## Continued Case Study Verification

A `Computer Vision` technology tag becomes selected and reveals an accurate contextual note about software working with visual input. The project modal remained open during the scroll test, so the completion state still needs a clean end-of-page verification after closing the modal.

## Completion-State Preparation

The project modal was closed successfully and the live page reached the contact section. The progress meter remained at 3/9 because only a subset of sections had been observed in the current browser session; a sequential section-visibility pass is needed to verify the final completion state.

## Exploration Completion Verification

A settled sequential visibility pass across Home, About, Interests, Skills, What I Can Do, Projects, Journey, Certifications, and Contact advances the live meter to `PORTFOLIO EXPLORATION 9/9` and renders `EXPLORATION COMPLETE / Thanks for exploring my portfolio. / Let’s Connect`. The journey contains the final destination `Aeronautical Engineering` and the animated journey trajectory element.
