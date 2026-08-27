from PIL import Image, ImageDraw, ImageFont
import math

W, H = 900, 900

palettes = [
    ("#FFD9E4", "#FF9EBB"),
    ("#FFE8EF", "#FFB6C9"),
    ("#FFC2D6", "#FF7FA6"),
    ("#FFF0F5", "#FFB3C6"),
    ("#FFDCE8", "#FF8FAE"),
    ("#FFE3EC", "#FF9CBA"),
]

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0,2,4))

def make_gradient(c1, c2):
    top = hex2rgb(c1)
    bottom = hex2rgb(c2)
    img = Image.new("RGB", (W, H))
    for y in range(H):
        t = y / H
        row = lerp(top, bottom, t)
        for x in range(W):
            img.putpixel((x, y), row)
    return img

def draw_heart(draw, cx, cy, size, fill):
    pts = []
    for t in range(0, 628):
        a = t / 100
        x = 16 * math.sin(a) ** 3
        y = 13 * math.cos(a) - 5 * math.cos(2*a) - 2 * math.cos(3*a) - math.cos(4*a)
        pts.append((cx + x * size, cy - y * size))
    draw.polygon(pts, fill=fill)

for i in range(1, 7):
    c1, c2 = palettes[i-1]
    img = make_gradient(c1, c2)
    draw = ImageDraw.Draw(img, "RGBA")
    draw_heart(draw, W/2, H/2 - 40, 14, (255, 255, 255, 130))
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 26)
    except Exception:
        font = ImageFont.load_default()
        font_small = font
    text = f"Photo {i}"
    bbox = draw.textbbox((0,0), text, font=font)
    tw = bbox[2]-bbox[0]
    draw.text(((W-tw)/2, H/2 + 90), text, font=font, fill=(255,255,255,230))
    sub = "replace me in static/images"
    bbox2 = draw.textbbox((0,0), sub, font=font_small)
    tw2 = bbox2[2]-bbox2[0]
    draw.text(((W-tw2)/2, H/2 + 145), sub, font=font_small, fill=(255,255,255,190))
    img.save(f"static/images/photo{i}.jpg", quality=88)

print("done")
