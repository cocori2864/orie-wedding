"use client";

interface ProductGalleryProps {
    image?: string;
    name?: string;
}

export function ProductGallery({ image, name }: ProductGalleryProps) {
    return (
        <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-[3/4] bg-[#F5F5F5] relative overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name || "Product"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#F0F0F0]" />
                )}
            </div>
            {/* Detail Images */}
            <div className="grid grid-cols-2 gap-4">
                <div className="w-full aspect-square bg-[#F5F5F5] overflow-hidden">
                    {image && (
                        <img
                            src={image}
                            alt={name || "Product detail"}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="w-full aspect-square bg-[#F5F5F5] overflow-hidden">
                    {image && (
                        <img
                            src={image}
                            alt={name || "Product detail"}
                            className="w-full h-full object-cover object-bottom"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
