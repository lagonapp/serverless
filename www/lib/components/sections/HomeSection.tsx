import { Button } from '../Button';
import { FunctionCode } from '../Code';
import { Text } from '../Text';

export const HomeSection = () => {
  return (
    <section className="flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 text-center items-center">
        <button
          type="button"
          className="text-grey text-base px-4 py-2 rounded-full bg-dark-gray hover:bg-blue-3 hover:text-white transition"
        >
          Get email updates
        </button>
        <Text size="h1" variant="radialGradientWhite">
          Deploy Serverless
          <br />
          Functions at the&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green via-[#5A7ACB] to-purple italic">
            Edge
          </span>
        </Text>
        <Text>
          Lagon is an <span className="text-white">open-source</span> platform that
          <br />
          allows you to run TypeScript and JavaScript
          <br />
          close to your users.
        </Text>
      </div>
      <div className="flex gap-4">
        <Button variant="primary">Deploy now!</Button>
        <Button variant="secondary">Discover</Button>
      </div>
      <svg
        width="964"
        height="936"
        viewBox="0 0 964 936"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute transform translate-y-[-20%] pointer-events-none"
      >
        <g filter="url(#filter0_d_207_2)">
          <circle cx="480.405" cy="450" r="367.5" stroke="url(#paint0_linear_207_2)" shapeRendering="crispEdges" />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M310.989 471.605L305.539 496.87L325.379 521.173L335.37 532.164L335.446 532.247L335.479 532.355L340.479 548.855L340.674 549.5H340H325.818L335.445 568.272L335.593 568.56L335.39 568.812L325.39 581.312L325.112 581.66L324.735 581.424L304.912 569.035L286.115 573.487L285.906 573.536L285.726 573.418L272.726 564.918L272.023 564.458L272.763 564.06L285.763 557.06L285.874 557H286H299V546.144L290.617 532.83L272.674 517.379L272.624 517.336L272.587 517.282L251.087 485.782L251.913 485.218L273.376 516.664L291.326 532.121L291.383 532.17L291.423 532.234L299.923 545.734L300 545.856V546V557.5V558H299.5H286.126L273.977 564.542L286.094 572.464L304.885 568.013L305.088 567.965L305.265 568.076L324.888 580.34L334.407 568.44L324.555 549.228L324.182 548.5H325H339.326L334.554 532.753L324.63 521.836L324.621 521.827L324.613 521.816L304.613 497.316L304.461 497.13L304.511 496.895L310.011 471.395L310.989 471.605ZM207.757 537.571L207.358 537.331L207.09 537.713L196.59 552.713L196.5 552.842V553V564.272L189.404 570.421L173.792 564.079L155.867 544.661L155.764 544.549L155.615 544.513L136.615 540.013L136.385 540.987L155.236 545.451L173.133 564.839L173.208 564.921L173.312 564.963L189.312 571.463L189.596 571.579L189.827 571.378L197.327 564.878L197.5 564.728V564.5V553.158L207.642 538.669L224.5 548.783V548.818V548.858V548.899V548.939V548.98V549.021V549.063V549.104V549.145V549.187V549.229V549.271V549.313V549.355V549.398V549.44V549.483V549.526V549.569V549.612V549.655V549.698V549.742V549.786V549.829V549.873V549.917V549.962V550.006V550.05V550.095V550.14V550.185V550.23V550.275V550.32V550.365V550.411V550.457V550.502V550.548V550.594V550.64V550.687V550.733V550.78V550.826V550.873V550.92V550.967V551.014V551.061V551.108V551.156V551.203V551.251V551.299V551.347V551.395V551.443V551.491V551.539V551.588V551.636V551.685V551.734V551.782V551.831V551.88V551.929V551.979V552.028V552.077V552.127V552.177V552.226V552.276V552.326V552.376V552.426V552.476V552.526V552.577V552.627V552.678V552.728V552.779V552.83V552.881V552.932V552.983V553.034V553.085V553.136V553.187V553.239V553.29V553.342V553.394V553.445V553.497V553.549V553.601V553.653V553.705V553.757V553.809V553.862V553.914V553.966V554.019V554.071V554.124V554.177V554.229V554.282V554.335V554.388V554.441V554.494V554.547V554.6V554.653V554.706V554.76V554.813V554.866V554.92V554.973V555.027V555.081V555.134V555.188V555.242V555.295V555.349V555.403V555.457V555.511V555.565V555.619V555.673V555.727V555.781V555.835V555.889V555.944V555.998V556.052V556.107V556.161V556.215V556.27V556.324V556.379V556.433V556.488V556.542V556.597V556.651V556.706V556.761V556.815V556.87V556.925V556.98V557.034V557.089V557.144V557.199V557.253V557.308V557.363V557.418V557.473V557.528V557.582V557.637V557.692V557.747V557.802V557.857V557.912V557.967V558.021V558.076V558.131V558.186V558.241V558.296V558.351V558.406V558.461V558.516V558.57V558.625V558.68V558.735V558.79V558.845V558.899V558.954V559.009V559.064V559.119V559.173V559.228V559.283V559.337V559.392V559.447V559.501V559.556V559.611V559.665V559.72V559.774V559.829V559.883V559.938V559.992V560.046V560.101V560.155V560.209V560.263V560.318V560.372V560.426V560.48V560.534V560.588V560.642V560.696V560.75V560.804V560.858V560.912V560.965V561.019V561.073V561.126V561.18V561.233V561.287V561.34V561.393V561.447V561.5V561.553V561.606V561.659V561.712V561.765V561.818V561.871V561.924V561.977V562.029V562.082V562.135V562.187V562.24V562.292V562.344V562.396V562.449V562.501V562.553V562.605V562.656V562.708V562.76V562.812V562.863V562.915V562.966V563.018V563.069V563.12V563.171V563.222V563.273V563.324V563.375V563.426V563.476V563.527V563.577V563.627V563.678V563.728V563.778V563.828V563.878V563.928V563.978V564.027V564.077V564.126V564.175V564.225V564.274V564.323V564.372V564.421V564.469V564.518V564.567V564.615V564.663V564.712V564.76V564.808V564.856V564.903V564.951V564.999V565.046V565.094V565.141V565.188V565.235V565.282V565.329V565.375V565.422V565.468V565.514V565.561V565.607V565.653V565.698V565.744V565.79V565.835V565.88V565.926V565.971V566.015V566.06V566.105V566.149V566.194V566.238V566.282V566.326V566.37V566.414V566.457V566.501V566.544V566.587V566.63V566.673V566.716V566.758V566.801V566.843V566.885V566.927V566.969V567.011V567.052V567.094V567.135V567.176V567.217V567.258V567.298V567.339V567.379V567.419V567.459V567.499V567.539V567.578V567.617V567.657V567.696V567.735V567.773V567.812V567.85V567.888V567.926V567.964V568.002V568.039V568.077V568.114V568.151V568.188V568.224V568.261V568.297V568.333V568.369V568.405V568.44V568.476V568.511V568.546V568.581V568.615V568.65V568.684V568.718V568.752V568.786V568.819V568.853V568.886V568.919V568.952V568.984V569.017V569.049V569.081V569.112V569.144V569.175V569.207V569.238V569.268V569.299V569.329V569.359V569.389V569.419V569.449V569.478V569.507V569.536V569.565V569.593V569.621V569.65V569.677V569.705V569.732V569.76V569.787V569.813V569.84V569.866V569.892V569.918V569.944V569.969V569.995V570.02V570.044V570.069V570.093V570.117V570.141V570.165V570.188V570.211V570.234V570.257V570.279V570.302V570.324V570.345V570.367V570.388V570.409V570.43V570.451V570.471V570.491V570.511V570.53V570.55V570.569V570.588V570.606V570.625V570.643V570.661V570.678V570.696V570.713V570.729V570.746V570.762V570.778V570.794V570.81V570.825V570.84V570.855V570.869V570.884V570.898V570.911V570.925V570.938V570.951V570.964V570.976V570.988V571C224.5 571.176 224.445 571.486 224.314 571.939C224.188 572.38 224.002 572.919 223.767 573.533C223.299 574.76 222.648 576.265 221.92 577.854C220.466 581.032 218.72 584.525 217.556 586.77L217.476 586.924L217.509 587.095L220.509 602.595L220.524 602.671L220.561 602.739L229.561 619.239L229.624 619.355L229.736 619.425L248.213 630.91L259.692 639.894L259.828 640H260H273.5H273.707L273.854 639.854L282.854 630.854L283 630.707V630.5V614V613.953L282.991 613.906L279.103 593.491C284.6 593.41 292.664 593.316 299.727 593.287C303.389 593.273 306.779 593.276 309.403 593.308C310.716 593.324 311.834 593.347 312.697 593.378C313.573 593.41 314.155 593.449 314.418 593.493C314.65 593.532 314.981 593.648 315.411 593.852C315.834 594.053 316.325 594.326 316.869 594.658C317.956 595.322 319.227 596.206 320.54 597.177C323.124 599.087 325.843 601.313 327.591 602.808L334.926 618.945L324.092 634.211L324.04 634.285L324.016 634.373L316.516 662.873L316.474 663.035L316.538 663.19L320.038 671.69L320.07 671.768L320.125 671.831L335.115 688.819L345.545 702.229L349.011 714.607L351.485 729.949L345.532 745.824L345.399 746.178L345.703 746.402L357.089 754.818L358.761 759H352.095L335.683 752.535L335.456 752.445L335.246 752.57L324.246 759.07L324.091 759.161L324.03 759.329L320.03 770.329L320 770.412V770.5V781H321V770.588L324.909 759.839L335.544 753.555L351.817 759.965L351.905 760H352H359.5H360.239L359.964 759.314L357.964 754.314L357.911 754.182L357.797 754.098L346.601 745.822L352.468 730.176L352.515 730.051L352.494 729.92L349.994 714.42L349.989 714.392L349.981 714.365L346.481 701.865L346.455 701.771L346.395 701.693L335.895 688.193L335.885 688.181L335.875 688.169L320.93 671.232L317.526 662.965L324.96 634.715L335.908 619.289L336.074 619.055L335.955 618.793L328.455 602.293L328.409 602.192L328.325 602.12C326.569 600.615 323.784 598.332 321.135 596.373C319.81 595.394 318.513 594.49 317.39 593.805C316.829 593.462 316.306 593.169 315.84 592.948C315.381 592.73 314.95 592.568 314.582 592.507C314.245 592.451 313.596 592.41 312.733 592.379C311.858 592.347 310.731 592.324 309.415 592.308C306.783 592.276 303.386 592.273 299.723 592.287C292.396 592.317 283.994 592.417 278.492 592.5L277.898 592.509L278.009 593.094L282 614.047V630.293L273.293 639H260.172L248.808 630.106L248.787 630.09L248.764 630.075L230.376 618.645L221.476 602.329L218.524 587.076C219.692 584.817 221.4 581.396 222.83 578.271C223.561 576.673 224.222 575.146 224.702 573.889C224.941 573.261 225.138 572.694 225.275 572.215C225.41 571.749 225.5 571.324 225.5 571V570.988V570.976V570.964V570.951V570.938V570.925V570.911V570.898V570.884V570.869V570.855V570.84V570.825V570.81V570.794V570.778V570.762V570.746V570.729V570.713V570.696V570.678V570.661V570.643V570.625V570.606V570.588V570.569V570.55V570.53V570.511V570.491V570.471V570.451V570.43V570.409V570.388V570.367V570.345V570.324V570.302V570.279V570.257V570.234V570.211V570.188V570.165V570.141V570.117V570.093V570.069V570.044V570.02V569.995V569.969V569.944V569.918V569.892V569.866V569.84V569.813V569.787V569.76V569.732V569.705V569.677V569.65V569.621V569.593V569.565V569.536V569.507V569.478V569.449V569.419V569.389V569.359V569.329V569.299V569.268V569.238V569.207V569.175V569.144V569.112V569.081V569.049V569.017V568.984V568.952V568.919V568.886V568.853V568.819V568.786V568.752V568.718V568.684V568.65V568.615V568.581V568.546V568.511V568.476V568.44V568.405V568.369V568.333V568.297V568.261V568.224V568.188V568.151V568.114V568.077V568.039V568.002V567.964V567.926V567.888V567.85V567.812V567.773V567.735V567.696V567.657V567.617V567.578V567.539V567.499V567.459V567.419V567.379V567.339V567.298V567.258V567.217V567.176V567.135V567.094V567.052V567.011V566.969V566.927V566.885V566.843V566.801V566.758V566.716V566.673V566.63V566.587V566.544V566.501V566.457V566.414V566.37V566.326V566.282V566.238V566.194V566.149V566.105V566.06V566.015V565.971V565.926V565.88V565.835V565.79V565.744V565.698V565.653V565.607V565.561V565.514V565.468V565.422V565.375V565.329V565.282V565.235V565.188V565.141V565.094V565.046V564.999V564.951V564.903V564.856V564.808V564.76V564.712V564.663V564.615V564.567V564.518V564.469V564.421V564.372V564.323V564.274V564.225V564.175V564.126V564.077V564.027V563.978V563.928V563.878V563.828V563.778V563.728V563.678V563.627V563.577V563.527V563.476V563.426V563.375V563.324V563.273V563.222V563.171V563.12V563.069V563.018V562.966V562.915V562.863V562.812V562.76V562.708V562.656V562.605V562.553V562.501V562.449V562.396V562.344V562.292V562.24V562.187V562.135V562.082V562.029V561.977V561.924V561.871V561.818V561.765V561.712V561.659V561.606V561.553V561.5V561.447V561.393V561.34V561.287V561.233V561.18V561.126V561.073V561.019V560.965V560.912V560.858V560.804V560.75V560.696V560.642V560.588V560.534V560.48V560.426V560.372V560.318V560.263V560.209V560.155V560.101V560.046V559.992V559.938V559.883V559.829V559.774V559.72V559.665V559.611V559.556V559.501V559.447V559.392V559.337V559.283V559.228V559.173V559.119V559.064V559.009V558.954V558.899V558.845V558.79V558.735V558.68V558.625V558.57V558.516V558.461V558.406V558.351V558.296V558.241V558.186V558.131V558.076V558.021V557.967V557.912V557.857V557.802V557.747V557.692V557.637V557.582V557.528V557.473V557.418V557.363V557.308V557.253V557.199V557.144V557.089V557.034V556.98V556.925V556.87V556.815V556.761V556.706V556.651V556.597V556.542V556.488V556.433V556.379V556.324V556.27V556.215V556.161V556.107V556.052V555.998V555.944V555.889V555.835V555.781V555.727V555.673V555.619V555.565V555.511V555.457V555.403V555.349V555.295V555.242V555.188V555.134V555.081V555.027V554.973V554.92V554.866V554.813V554.76V554.706V554.653V554.6V554.547V554.494V554.441V554.388V554.335V554.282V554.229V554.177V554.124V554.071V554.019V553.966V553.914V553.862V553.809V553.757V553.705V553.653V553.601V553.549V553.497V553.445V553.394V553.342V553.29V553.239V553.187V553.136V553.085V553.034V552.983V552.932V552.881V552.83V552.779V552.728V552.678V552.627V552.577V552.526V552.476V552.426V552.376V552.326V552.276V552.226V552.177V552.127V552.077V552.028V551.979V551.929V551.88V551.831V551.782V551.734V551.685V551.636V551.588V551.539V551.491V551.443V551.395V551.347V551.299V551.251V551.203V551.156V551.108V551.061V551.014V550.967V550.92V550.873V550.826V550.78V550.733V550.687V550.64V550.594V550.548V550.502V550.457V550.411V550.365V550.32V550.275V550.23V550.185V550.14V550.095V550.05V550.006V549.962V549.917V549.873V549.829V549.786V549.742V549.698V549.655V549.612V549.569V549.526V549.483V549.44V549.398V549.355V549.313V549.271V549.229V549.187V549.145V549.104V549.063V549.021V548.98V548.939V548.899V548.858V548.818V548.777V548.737V548.697V548.658V548.618V548.578V548.539V548.5V548.217L225.257 548.071L207.757 537.571ZM805.24 555.014L811.433 544.249L810.567 543.751L804.306 554.631L804.24 554.747V554.88V575.832L777.906 582.432L777.686 582.488L777.583 582.69L769.653 598.173L769.644 598.19L769.637 598.207L757.597 626.929L750.645 631.029L750.64 631.032L732.693 641.912L732.599 641.969L732.537 642.061L720.66 659.719L712.688 656.522L712.229 656.338L712.04 656.794L707.994 666.529H694.137H693.801L693.674 666.841L689.918 676.047L689.637 676.736H690.381H707.926L712.001 695.122V714.22L708.013 724.217L683.787 720.1L683.745 720.093H683.703H667.426H667.111L666.975 720.377L661.549 731.676L661.475 731.83L661.511 731.998L666.937 757.106L667.022 757.5H667.426H676.26L678.11 759.812L678.89 759.188L676.89 756.688L676.74 756.5H676.5H667.829L662.525 731.954L667.74 721.093H683.661L708.244 725.271L708.642 725.339L708.792 724.963L712.966 714.502L713.001 714.412V714.316V695.067V695.012L712.99 694.959L708.816 676.128L708.729 675.736H708.328H691.125L694.473 667.529H708.328H708.661L708.789 667.221L712.774 657.634L720.663 660.798L721.038 660.949L721.264 660.613L733.306 642.71L751.153 631.89L751.158 631.887L758.248 627.706L758.391 627.621L758.456 627.468L770.552 598.612L778.37 583.347L804.861 576.707L805.24 576.612V576.222V555.014ZM690.5 554.5V553.113L689.615 554.181L675.115 571.681L675.027 571.787L675.006 571.924L672.006 591.424L671.969 591.661L672.131 591.838L683 603.695V622.908L677.532 637.323L677.412 637.641L677.664 637.87L683.164 642.87L683.359 643.048L683.617 642.986L708.559 637H723.5H724.532L723.892 636.19L716.678 627.051L723.841 620.366L724.08 620.143L723.972 619.835L720.472 609.835L720.438 609.739L720.37 609.664L701 588.307V572V571.5H700.5H690.5V554.5ZM673.031 591.339L675.973 572.213L689.5 555.887V572V572.5H690H700V588.5V588.693L700.13 588.836L719.562 610.261L722.92 619.857L715.659 626.634L715.322 626.949L715.608 627.31L722.468 636H708.5H708.441L708.383 636.014L683.641 641.952L678.588 637.359L683.968 623.177L684 623.092V623V603.5V603.306L683.869 603.162L673.031 591.339ZM644 603H642.858L643.633 603.839L648.858 609.5H635.5H635.263L635.113 609.683L630.613 615.183L630.326 615.534L630.646 615.854L637.888 623.095L630.556 637.27L630.359 637.651L630.705 637.904L643.705 647.404L643.916 647.558L644.164 647.473L657.164 642.973L657.304 642.924L657.395 642.806L669.395 627.306L669.634 626.998L669.393 626.691L664.097 619.951L669.438 610.241L669.604 609.94L669.382 609.677L663.882 603.177L663.732 603H663.5H644ZM650.367 609.661L645.142 604H663.268L668.396 610.06L663.062 619.759L662.903 620.049L663.107 620.309L668.366 627.002L656.696 642.076L644.084 646.442L631.641 637.349L638.944 623.23L639.112 622.905L638.854 622.646L631.674 615.466L635.737 610.5H650H651.142L650.367 609.661Z"
          fill="url(#paint1_linear_207_2)"
        />
        <rect
          x="0.19455"
          y="641.069"
          width="53"
          height="9"
          transform="rotate(-22.5615 0.19455 641.069)"
          fill="url(#paint2_radial_207_2)"
          fillOpacity="0.08"
        />
        <rect
          x="41.4045"
          y="699.692"
          width="98.2256"
          height="16.6798"
          transform="rotate(-31.0697 41.4045 699.692)"
          fill="url(#paint3_radial_207_2)"
          fillOpacity="0.06"
        />
        <rect
          x="67.8411"
          y="784.019"
          width="201.36"
          height="34.1933"
          transform="rotate(-40.5495 67.8411 784.019)"
          fill="url(#paint4_radial_207_2)"
          fillOpacity="0.04"
        />
        <rect
          x="782.161"
          y="579"
          width="201.36"
          height="34.1933"
          transform="rotate(25.5661 782.161 579)"
          fill="url(#paint5_radial_207_2)"
          fillOpacity="0.04"
        />
        <rect
          x="201.405"
          y="784.104"
          width="53"
          height="9"
          transform="rotate(-50.8555 201.405 784.104)"
          fill="url(#paint6_radial_207_2)"
          fillOpacity="0.08"
        />
        <rect
          x="777.274"
          y="789.835"
          width="53"
          height="9"
          transform="rotate(-131.142 777.274 789.835)"
          fill="url(#paint7_radial_207_2)"
          fillOpacity="0.08"
        />
        <rect
          x="557.923"
          y="935.218"
          width="101.796"
          height="17.2861"
          transform="rotate(-101.129 557.923 935.218)"
          fill="url(#paint8_radial_207_2)"
          fillOpacity="0.06"
        />
        <rect
          x="509.256"
          y="891.826"
          width="101.796"
          height="17.2861"
          transform="rotate(-94.4235 509.256 891.826)"
          fill="url(#paint9_radial_207_2)"
          fillOpacity="0.06"
        />
        <rect
          x="914.836"
          y="633.75"
          width="53"
          height="9"
          transform="rotate(-156.037 914.836 633.75)"
          fill="url(#paint10_radial_207_2)"
          fillOpacity="0.08"
        />
        <rect
          x="856.626"
          y="821.4"
          width="113.98"
          height="19.3551"
          transform="rotate(-134.031 856.626 821.4)"
          fill="url(#paint11_radial_207_2)"
          fillOpacity="0.06"
        />
        <defs>
          <filter
            id="filter0_d_207_2"
            x="11.4045"
            y="-19"
            width="938"
            height="938"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_207_2" />
            <feOffset />
            <feGaussianBlur stdDeviation="50" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.295833 0 0 0 0 0.36625 0 0 0 0 1 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_207_2" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_207_2" result="shape" />
          </filter>
          <linearGradient
            id="paint0_linear_207_2"
            x1="480.405"
            y1="82"
            x2="480.405"
            y2="818"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.536458" stopColor="#0500FF" stopOpacity="0" />
            <stop offset="1" stopColor="#87B7FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_207_2"
            x1="473.909"
            y1="504.925"
            x2="473.909"
            y2="726.961"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0500FF" stopOpacity="0" />
            <stop offset="1" stopColor="#87B7FF" />
          </linearGradient>
          <radialGradient
            id="paint2_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(26.6946 645.569) rotate(90) scale(4.5 26.5)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(90.5173 708.032) rotate(90) scale(8.33991 49.1128)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(168.521 801.115) rotate(90) scale(17.0966 100.68)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint5_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(882.841 596.097) rotate(90) scale(17.0966 100.68)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint6_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(227.905 788.604) rotate(90) scale(4.5 26.5)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint7_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(803.774 794.335) rotate(90) scale(4.5 26.5)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint8_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(608.821 943.861) rotate(90) scale(8.64303 50.8978)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint9_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(560.154 900.469) rotate(90) scale(8.64303 50.8978)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint10_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(941.336 638.25) rotate(90) scale(4.5 26.5)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint11_radial_207_2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(913.616 831.078) rotate(90) scale(9.67757 56.9901)"
          >
            <stop stopColor="#79BFFF" />
            <stop offset="1" stopColor="#232F98" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="border-l border-dashed border-[#86B6FF] h-12 mt-44" />
      <div className="-mt-8">
        <FunctionCode>
          export function <span className="text-blue-1">handler</span>(request:&nbsp;
          <span className="text-purple">Request</span>) &#123;
          <br />
          &nbsp;&nbsp;const ip = request.headers.get(<span className="text-green">&apos;X-Forwarded-For&apos;</span>
          )
          <br />
          &nbsp;&nbsp;return new <span className="text-purple">Response</span>(
          <span className="text-green">`Your IP is: </span>
          {'${ip}'}
          <span className="text-green">`</span>)
          <br />
          &#125;
        </FunctionCode>
      </div>
    </section>
  );
};
