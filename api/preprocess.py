import torchvision.transforms as transforms

def preprocess(image_pil):
    preprocess = transforms.Compose([
        transforms.Resize(128),
        transforms.ToTensor(),
    ])
    return preprocess(image_pil).unsqueeze(0)