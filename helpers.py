from PIL import Image
import numpy as np

def create_45deg_stripes(size:tuple, pattern:list):
    """
    Creates a 45 degree striped pattern of the given size and pattern in grayscale format.

    Args:
        size (tuple): Size of the image to be created.
        pattern (list): List of colors to be used in the pattern. Must be all numbers between 0 and 1. (brightness)

    Returns:
        img (Image): PIL Image object containing the generated pattern
    """

    img = np.array(Image.new('L', size))
    for x in range(size[0]):
        for y in range(size[1]):
            img[y][x] = int(pattern[(x+y)%len(pattern)]*255)
    return Image.fromarray(img)

def resize_nearest(img:Image, size:tuple):
    """
    Resizes an image to the given size using nearest neighbor interpolation.

    Args:
        img (Image): PIL Image object to be resized.
        size (tuple): Size of the image to be created.

    Returns:
        img (Image): PIL Image object containing the resized image
    """

    return img.resize(size, Image.NEAREST)