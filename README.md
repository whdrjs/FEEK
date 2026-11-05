# FEEK

브라우저에서 사진을 직접 보정하는 FEEK의 초기 프로토타입입니다.

## 현재 상태
기존 배포본을 복구한 기준 버전입니다. 화면 이름은 FEEK으로 변경했습니다. HeroUI Figma Kit의 다크 색상, 버튼과 슬라이더 규격을 네이티브 HTML/CSS로 반영했습니다. 모드 전환은 제공하지 않습니다. 보정 엔진 품질 개선은 아직 반영되지 않았습니다.

## 로컬 실행
Node.js가 설치되어 있다면 `node scripts/serve.mjs`를 실행하고 출력된 주소를 여세요. 빌드나 패키지 설치가 필요하지 않습니다.

Browser-local Korean photo-retouch prototype. Open dist/index.html via HTTP. No build step or backend. Hosting manifest points to dist.

## Initial scope
- JPG/PNG/WebP file opening and drag/drop; working image capped at 2400 px long edge.
- Push, pinch and bloat via inverse displacement fields and bilinear resampling.
- Click blemish repair: nearby patch candidate search, boundary color matching and feathered blending. Clone stamp with a user-selected source.
- Six facial controls: eye size, eye width, nose width, mouth size, face width and chin length. These are conservative radial deformation approximations, not anatomical or 3D reconstruction.
- Optional MediaPipe Tasks Vision 0.10.21 face landmarks, downloaded from jsDelivr/Google and evaluated locally. Requires compatible browser graphics and network access for model/runtime download. No face photo is sent to either endpoint.
- Five-point manual fallback; one near-frontal face recommended.
- Brightness, contrast and saturation; bounded bitmap undo/redo, held original comparison, zoom/pan, PNG download.

## Costs and limitations
No paid inference API or per-photo backend is used. Hosting and bandwidth costs depend on the chosen provider. The optional landmark model is machine learning for coordinates, not generative editing. Editing is browser-local; the page does not persist or upload photos. Refresh loses the session. Browser downloads save PNG at working resolution, which may be lower than the source image.

This is a prototype: no background geometry protection, no hair/background segmentation, no full-resolution export replay, no multiple-face selection, and no guaranteed realistic restoration of large objects. Large images and repeated strokes can be slow because the Canvas CPU implementation copies displacement arrays. Sliders are independent preview controls; use Apply before switching tools. Manual brushes invalidate existing landmark coordinates.

## Priorities next
1. Real portrait QA across mobile Safari/Chrome; rotated faces and pose-aware transforms.
2. Worker or WebGL rendering, displacement history and original-resolution export replay.
3. Protect-region mask and background distortion constraints.
4. Additional proportional controls (forehead, philtrum, brow and jaw) only after face geometry QA.

## Reference APK inspection
Read-only archive inspection of supplied Photoshop Fix APK revealed brush settings, face-detection data, native libraries and tutorial resource names. Native library behavior has not been decompiled or established. No Adobe code, models, icons or other binary assets are included in this project; the implementation and practice illustration are original.

## Validation
- Node syntax check passes.
- Browser UI: practice image, drag push, eye slider, manual five-point assignment, mouth slider apply, blemish click, undo/redo, brightness apply and PNG download verified.
- Download decoded as a 900 x 1000 PNG.
- MediaPipe runtime fetched, but cloud QA browser could not create WebGL contexts. Successful automatic detection on a real portrait remains unverified; failure fallback was verified.
- Mobile layout provided but physical-device touch and performance QA remains pending.
