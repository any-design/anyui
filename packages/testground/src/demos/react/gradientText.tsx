import { GradientText } from '@any-design/anyui-react';

export default function GradientTextDemo() {
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Default</div>
        <div className="demo-row">
          <GradientText size="24px">Gradient Text</GradientText>
          <GradientText size="24px" reverseGradient>
            Reversed
          </GradientText>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Custom Gradient</div>
        <div className="demo-row">
          <GradientText size="24px" gradient="linear-gradient(90deg, #ff8a00, #e52e71)">
            Custom Gradient
          </GradientText>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Glow</div>
        <div className="demo-row">
          <GradientText size="24px" glow>
            Glowing Text
          </GradientText>
          <GradientText size="24px" glow reverseGradient>
            Reversed Glow
          </GradientText>
        </div>
      </div>
    </div>
  );
}
