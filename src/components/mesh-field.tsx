import { useEffect, useRef } from "react";

const CFG = {
  connectionRadius: 140,
  mouseRepelRadius: 100,
  baseColor: "rgba(0, 255, 170, 0.4)",
  activeColor: "rgba(0, 255, 200, 1)",
  scanSpeed: 0.5,
  pulseSpeed: 4,
};

type Node = { x: number; y: number; vx: number; vy: number; size: number };
type Pulse = { x: number; y: number; r: number; life: number };

export function MeshField() {
  const fieldRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const linksRef = useRef<SVGGElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const nodeLayer = nodesRef.current;
    const linkLayer = linksRef.current;
    const cursor = cursorRef.current;
    if (!field || !nodeLayer || !linkLayer || !cursor) return;

    const mouse = { x: -1000, y: -1000, active: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const nodeEls: SVGLineElement[][] = [];

    const makeLine = (parent: SVGGElement) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke-linecap", "round");
      parent.appendChild(line);
      return line;
    };

    const seed = () => {
      nodeLayer.replaceChildren();
      nodeEls.length = 0;
      const count = Math.max(36, Math.floor((width * height) / 9000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CFG.scanSpeed,
        vy: (Math.random() - 0.5) * CFG.scanSpeed,
        size: Math.random() * 2 + 1,
      }));
      for (let i = 0; i < count; i++) {
        nodeEls.push([makeLine(nodeLayer), makeLine(nodeLayer)]);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      for (const svg of [field, cursor]) {
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }
      seed();
    };

    const draw = () => {
      linkLayer.replaceChildren();
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!reduce) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0) {
            node.x = 0;
            node.vx *= -1;
          } else if (node.x > width) {
            node.x = width;
            node.vx *= -1;
          }
          if (node.y < 0) {
            node.y = 0;
            node.vy *= -1;
          } else if (node.y > height) {
            node.y = height;
            node.vy *= -1;
          }
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < CFG.mouseRepelRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (CFG.mouseRepelRadius - dist) / CFG.mouseRepelRadius;
            node.x -= Math.cos(angle) * force * 2;
            node.y -= Math.sin(angle) * force * 2;
          }
        }
        const near = Math.hypot(mouse.x - node.x, mouse.y - node.y) < CFG.connectionRadius;
        const [h, v] = nodeEls[i];
        const arm = node.size;
        h.setAttribute("x1", String(node.x - arm));
        h.setAttribute("y1", String(node.y));
        h.setAttribute("x2", String(node.x + arm));
        h.setAttribute("y2", String(node.y));
        v.setAttribute("x1", String(node.x));
        v.setAttribute("y1", String(node.y - arm));
        v.setAttribute("x2", String(node.x));
        v.setAttribute("y2", String(node.y + arm));
        const color = near ? CFG.activeColor : CFG.baseColor;
        const widthPx = near ? "1.5" : "0.8";
        for (const line of [h, v]) {
          line.setAttribute("stroke", color);
          line.setAttribute("stroke-width", widthPx);
        }
        if (mouse.active && near) {
          const reach = CFG.connectionRadius * 0.6;
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const d = Math.hypot(node.x - other.x, node.y - other.y);
            if (d >= reach) continue;
            const line = makeLine(linkLayer);
            line.setAttribute("x1", String(node.x));
            line.setAttribute("y1", String(node.y));
            line.setAttribute("x2", String(other.x));
            line.setAttribute("y2", String(other.y));
            line.setAttribute("stroke", `rgba(0, 255, 200, ${1 - d / reach})`);
            line.setAttribute("stroke-width", "0.5");
          }
          const md = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          const tether = makeLine(linkLayer);
          tether.setAttribute("x1", String(node.x));
          tether.setAttribute("y1", String(node.y));
          tether.setAttribute("x2", String(mouse.x));
          tether.setAttribute("y2", String(mouse.y));
          tether.setAttribute("stroke", `rgba(0, 255, 200, ${1 - md / CFG.connectionRadius})`);
          tether.setAttribute("stroke-width", "0.5");
        }
      }

      const rings: string[] = [];
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.r += CFG.pulseSpeed;
        pulse.life -= 0.02;
        if (pulse.life <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        rings.push(
          `<circle cx="${pulse.x}" cy="${pulse.y}" r="${pulse.r}" fill="none" stroke="rgba(0, 255, 200, ${pulse.life})" stroke-width="1" />`,
        );
      }
      if (mouse.active && fine) {
        const spin = (Date.now() * 0.002 * 180) / Math.PI;
        rings.push(
          `<circle cx="${mouse.x}" cy="${mouse.y}" r="20" fill="none" stroke="#ffffff" stroke-width="1" />`,
          `<circle cx="${mouse.x}" cy="${mouse.y}" r="2" fill="#00ff00" />`,
          `<circle cx="${mouse.x}" cy="${mouse.y}" r="24" fill="none" stroke="rgba(0, 255, 170, 0.5)" stroke-width="1" stroke-dasharray="38 113" stroke-dashoffset="${-spin}" />`,
        );
      }
      cursor.innerHTML = rings.join("");
      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
      if (fine && !reduce) document.body.classList.add("mesh-cursor");
    };
    const onDown = (event: MouseEvent) => {
      if (!fine) return;
      pulses.push({ x: event.clientX, y: event.clientY, r: 0, life: 1 });
    };
    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      document.body.classList.remove("mesh-cursor");
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    document.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("mesh-cursor");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <svg ref={fieldRef} className="mesh-back" aria-hidden="true">
        <g ref={linksRef} />
        <g ref={nodesRef} />
      </svg>
      <svg ref={cursorRef} className="cursor-canvas" aria-hidden="true" />
    </>
  );
}
